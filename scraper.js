const axios = require("axios");
const cheerio = require("cheerio");

async function getTitles() {
  const url = "https://example.com";
  const response = await axios.get(url);

  const $ = cheerio.load(response.data);

  const titles = $("h2")
    .map((_, element) => $(element).text())
    .get();

  return titles;
}

getTitles()
  .then((titles) => {
    console.log(titles);
  })
  .catch((err) => {
    console.error(err);
  });
