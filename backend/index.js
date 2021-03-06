import express from 'express';
import cors from 'cors';
import uniqueCount from './lib/utils';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import './lib/cron';
import db from './lib/db';
import aggregate from './lib/aggregate';

const app = express();
app.use(cors());

app.get('/scrape', async (req, res, next) => {
	console.log('Scraping!');
	const [iCount, tCount] = await Promise.all([getInstagramCount(), getTwitterCount()]);
	res.json({ iCount, tCount });
});

app.get('/data', async (req, res, next) => {
	const { twitter, instagram } = db.value();
	const unqiueTwitter = uniqueCount(twitter);
	const unqiueInstagram = uniqueCount(instagram);
	res.json({ twitter: unqiueTwitter, instagram: unqiueInstagram });
});

app.get('/aggregate', async (req, res, next) => {
	const { twitter, instagram } = db.value();
	const unqiueTwitter = uniqueCount(twitter);
	const unqiueInstagram = uniqueCount(instagram);
	res.json({ twitter: aggregate(twitter), instagram: aggregate(instagram) });
});

app.listen(2093, () => console.log(`App Running On Port http://localhost:2093`));
