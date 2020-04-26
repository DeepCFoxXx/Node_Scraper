import express from "express";
import cors from "cors";
import { getInstagramCount, getTwitterCount } from "./lib/scraper";
import "./lib/cron";
import db from "./lib/db";

const app = express();
app.use(cors());

app.get("/scrape", async (req, res, next) => {
  console.log("Scraping!");
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount(),
  ]);
  res.json({ iCount, tCount });
});

app.get("/data", async (req, res, next) => {
  const twitter = db.get("twitter").value;
  res.json(twitter);
});

app.listen(2093, () =>
  console.log(`App Running On Port http://localhost:2093`)
);
