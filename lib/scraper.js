import axios from "axios";
import cheerio from "cheerio";

async function getHTML(url) {
  const { data: html } = await axios.get(
    "https://twitter.com/danidivinemodel?lang=en"
  );
  return html;
}

async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  console.log($);
}

export { getHTML, getTwitterFollowers };
