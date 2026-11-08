import { spawn } from "node:child_process";
import fs from "node:fs";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const auditDir = "/tmp/audit-film";
if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir, { recursive: true });

async function run() {
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--window-size=1440,900",
    "about:blank",
  ]);

  await new Promise((r) => setTimeout(r, 1200));

  const versionRes = await fetch("http://127.0.0.1:9222/json/version");
  const versionData = await versionRes.json();

  const newTargetRes = await fetch("http://127.0.0.1:9222/json/new?http://localhost:3000/?no-loader", { method: "PUT" });
  const targetData = await newTargetRes.json();
  const pageWsUrl = targetData.webSocketDebuggerUrl;

  const ws = new WebSocket(pageWsUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  const consoleErrors = [];

  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) p.reject(msg.error);
      else p.resolve(msg.result);
    } else if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
      consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(" "));
    }
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("DOM.enable");

  await new Promise((r) => setTimeout(r, 2000));

  async function capture(filename) {
    const res = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${auditDir}/${filename}.png`, Buffer.from(res.data, "base64"));
    console.log(`Captured ${filename}.png`);
  }

  async function scrollTo(id, delay = 800) {
    await send("Runtime.evaluate", {
      expression: `document.getElementById('${id}')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await new Promise((r) => setTimeout(r, delay));
  }

  // Desktop Acts 0 to 8
  await capture("act0-ouverture");

  await scrollTo("acte-01");
  await capture("act1-ciel");

  await scrollTo("acte-02");
  await capture("act2-code");

  await scrollTo("acte-03");
  await capture("act3-merge");

  await scrollTo("acte-04");
  await capture("act4-construire");

  await scrollTo("acte-05");
  await capture("act5-automatiser");

  await scrollTo("arsenal");
  await capture("act6-arsenal");

  await scrollTo("acte-07");
  await capture("act7-preuves");

  await scrollTo("acte-08");
  await capture("act8-suite");

  // Mobile test
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0);" });
  await new Promise((r) => setTimeout(r, 600));
  await capture("mobile-act0-ouverture");

  await scrollTo("acte-03");
  await capture("mobile-act3-merge");

  await scrollTo("acte-04");
  await capture("mobile-act4-construire");

  ws.close();
  chrome.kill();

  console.log("Console errors detected:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log(consoleErrors);
  }
}

run().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
