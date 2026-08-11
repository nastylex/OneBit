const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".svg": "image/svg+xml", ".png": "image/png" };

http.createServer((req, res) => {
  const filePath = path.join(root, req.url === "/" ? "index.html" : req.url.split("?")[0]);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404); res.end("Not found"); return;
  }
  res.writeHead(200, { "Content-Type": mime[path.extname(filePath)] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}).listen(8123, () => console.log("serving OneBEAT on http://localhost:8123"));
