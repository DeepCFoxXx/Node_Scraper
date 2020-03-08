import { getHTML, getTwitterFollowers } from "./lib/scraper";

async function go() {
  getTwitterFollowers(
    await getHTML("https://twitter.com/danidivinemodel?lang=en")
  );
}

go();
