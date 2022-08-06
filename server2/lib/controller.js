"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { scrapWeb } = require("./themodel");
/*
implement your server code here
*/
async function scrap(req, res, url) {
    try {
        const response = await scrapWeb(url);
        res.end(JSON.stringify(response));
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = { scrap };
