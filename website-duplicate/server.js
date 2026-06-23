const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 5521;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = http.createServer((request, response) => {
  const requestedPath = decodeURIComponent(new URL(request.url, `http://localhost:${port}`).pathname);
  const isHome = requestedPath === "/" || requestedPath === "";
  const safePath = path.normalize(isHome ? "index.html" : requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, safePath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store, max-age=0",
      "Pragma": "no-cache"
    });
    response.end(data);
  });
});

server.listen(port, () => {
  console.log(`Website running at http://127.0.0.1:${port}`);
  console.log(`Alternative URL: http://localhost:${port}`);
});
