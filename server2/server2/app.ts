import http, { IncomingMessage, Server, ServerResponse } from "http";
const url = require("url");
const { scrap } = require("./controller");

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const link = url.parse(req.url, true).query.url; //help

    if (link && req.method === "GET") {
      scrap(req, res, link);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify("not found"));
    }
  }
);
const PORT = process.env.PORT || 3005;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
