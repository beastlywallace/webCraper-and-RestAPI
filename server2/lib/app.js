"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url = require("url");
const { scrap } = require("./controller");
const server = http_1.default.createServer((req, res) => {
    const link = url.parse(req.url, true).query.url; //help
    if (link && req.method === "GET") {
        scrap(req, res, link);
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify("not found"));
    }
});
const PORT = process.env.PORT || 3005;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
