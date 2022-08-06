import { IncomingMessage, ServerResponse } from "http";
const { scrapWeb } = require("./themodel");
/*
implement your server code here
*/

async function scrap(req: IncomingMessage, res: ServerResponse, url: string) {
  try {
    const response = await scrapWeb(url);
    res.end(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
}
module.exports = { scrap };

