import { spawn } from "node:child_process";
import fs from "node:fs";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const auditDir = "/tmp/audit";
if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir, { recursive: true });

async function run() {
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--window-size=1440,900",
    "about:blank",
  ]);

  // Wait for Chrome to bind port
  await new Promise((r) => setTimeout(r, 1200));

  const versionRes = await fetch("http://127.0.0.1:9222/json/version");
  const versionData = await versionRes.json();
  const browserWsUrl = versionData.webSocketDebuggerUrl;

  // Open a new page target
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

  // Wait for page load and fonts
  await new Promise((r) => setTimeout(r, 2000));

  async function capture(filename, clip = null) {
    const params = { format: "png" };
    if (clip) params.clip = clip;
    const res = await send("Page.captureScreenshot", params);
    fs.writeFileSync(`${auditDir}/${filename}.png`, Buffer.from(res.data, "base64"));
    console.log(`Captured ${filename}.png`);
  }

  // 1. Desktop Hero
  await capture("01-hero");

  // Scroll to Arsenal
  await send("Runtime.evaluate", {
    expression: "document.getElementById('arsenal')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("02-arsenal");

  // Scroll to Chapter AI
  await send("Runtime.evaluate", {
    expression: "document.getElementById('chapitre-01')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("03-chapter-ai");

  // Scroll to Chapter SaaS
  await send("Runtime.evaluate", {
    expression: "document.getElementById('chapitre-02')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("04-chapter-saas");

  // Scroll to Chapter Lunor
  await send("Runtime.evaluate", {
    expression: "document.getElementById('chapitre-03')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("05-chapter-lunor");

  // Scroll to Chapter Drone
  await send("Runtime.evaluate", {
    expression: "document.getElementById('chapitre-04')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("06-chapter-drone");

  // Scroll to Chapter Content
  await send("Runtime.evaluate", {
    expression: "document.getElementById('chapitre-05')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("07-chapter-content");

  // Scroll to Bento Projects
  await send("Runtime.evaluate", {
    expression: "document.getElementById('realisations')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("08-bento-projects");

  // Scroll to Method
  await send("Runtime.evaluate", {
    expression: "document.getElementById('methode')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("09-method");

  // Scroll to Contact
  await send("Runtime.evaluate", {
    expression: "document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("10-contact");

  // Mobile test
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send("Runtime.evaluate", {
    expression: "window.scrollTo(0, 0);",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("mobile-01-hero");

  await send("Runtime.evaluate", {
    expression: "document.getElementById('arsenal')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("mobile-02-arsenal");

  await send("Runtime.evaluate", {
    expression: "document.getElementById('chapitre-01')?.scrollIntoView({ behavior: 'instant' });",
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture("mobile-03-chapter-ai");

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
