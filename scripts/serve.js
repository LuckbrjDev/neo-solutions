const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
};

http
  .createServer((request, response) => {
    const requestedPath = request.url === "/" ? "/index.html" : request.url;
    const filePath = path.join(root, decodeURIComponent(requestedPath.split("?")[0]));

    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
    });
    fs.createReadStream(filePath).pipe(response);
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Servidor local em http://127.0.0.1:${port}`);
  });
