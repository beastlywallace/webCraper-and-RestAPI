const cheerio = require("cheerio");
const axios = require("axios");

interface Result {
  title: string;
  description: string;
  images: string[];
}

async function scrapWeb(url: string) {
  let { data } = await axios.get(url);

  let cherry = cheerio.load(data);

  let output: Result = {
    title: "title missing",
    description: "description not found",
    images: [],
  };

  let newTitle = cherry("title").text();
  let newDescription = cherry('meta[name="description"]').attr("content");
  let newImages = cherry("img"); // an array that's why you loop

  if (newTitle) {
    output.title = newTitle;
  }
  if (newDescription) {
    output.description = newDescription;
  }
  if (newImages) {
    for (let elem of newImages) {
      let imageEl = cherry(elem).attr("src");
      if (imageEl) {
        output.images.push(imageEl);
      }
    }
  }
  return output;
}
module.exports = { scrapWeb };
