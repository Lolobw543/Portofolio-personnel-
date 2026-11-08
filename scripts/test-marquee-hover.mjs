import { spawn } from "node:child_process";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function testMarquee() {
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--window-size=1440,900",
    "about:blank",
  ]);

  await new Promise((r) => setTimeout(r, 1200));

  const targetRes = await fetch("http://127.0.0.1:9222/json/new?http://localhost:3000/?no-loader", { method: "PUT" });
  const targetData = await targetRes.json();

  const ws = new WebSocket(targetData.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise((r) => { ws.onopen = r; });

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) p.reject(msg.error);
      else p.resolve(msg.result);
    }
  };

  await send("Page.enable");
  await send("Runtime.enable");

  // Wait 2s for page load
  await new Promise((r) => setTimeout(r, 2000));

  // Scroll to Arsenal
  await send("Runtime.evaluate", {
    expression: "document.getElementById('arsenal')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));

  // Move mouse over the marquee row (position around x=500, y=500)
  await send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: 500,
    y: 500,
  });

  console.log("Hovering cursor over marquee tile for 10 seconds...");
  const samples = [];

  for (let i = 1; i <= 10; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await send("Runtime.evaluate", {
      expression: "window.getComputedStyle(document.querySelector('.animate-marquee-left')).transform",
    });
    const transform = res.result.value;
    samples.push({ second: i, transform });
    console.log(`t = ${i}s: ${transform}`);
  }

  // Parse translateX values from matrix
  const xValues = samples.map(s => {
    const match = s.transform.match(/matrix\(([^)]+)\)/) || s.transform.match(/matrix3d\(([^)]+)\)/);
    if (!match) return 0;
    const parts = match[1].split(",").map(p => parseFloat(p.trim()));
    return parts.length === 6 ? parts[4] : parts[12];
  });

  console.log("\nSampled translation X:", xValues);
  const diffs = [];
  for (let i = 1; i < xValues.length; i++) {
    diffs.push(Math.round(xValues[i] - xValues[i-1]));
  }
  console.log("Translation delta per second (px/s):", diffs);

  const isConstant = diffs.every(d => Math.abs(d) > 20); // Moving at speed > 20px/s without stopping
  console.log("Marquee keeps moving continuously under hover:", isConstant ? "SUCCESS ✅" : "FAILED ❌");

  ws.close();
  chrome.kill();
}

testMarquee().catch(console.error);
