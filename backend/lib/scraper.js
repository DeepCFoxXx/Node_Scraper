import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';
import moment from 'moment';

export async function getHTML(url) {
	const { data: html } = await axios.get(url);
	return html;
}

export async function getTwitterFollowers(html) {
	const $ = cheerio.load(html);
	const span = $('[data-nav="followers"] .ProfileNav-value');
	return span.data('count');
}

export async function getInstagramFollowers(html) {
	const $ = cheerio.load(html);
	const dataInString = $('script[type="application/ld+json"]').html();
	const pageObject = JSON.parse(dataInString);
	return parseInt(pageObject.mainEntityofPage.interactionStatistic.userInteractionCount);
}

export async function getInstagramCount() {
	const html = await getHTML('https://instagram.com/dani_divine');
	const instagramCount = await getInstagramFollowers(html);
	return instagramCount;
}

export async function getTwitterCount() {
	const html = await getHTML('https://twitter.com/danidivinemodel?lang=en');
	const twitterCount = await getTwitterFollowers(html);
	return twitterCount;
}

export async function runCron() {
	console.log('Scraping!');
	const [iCount, tCount] = await Promise.all([getInstagramCount(), getTwitterCount()]);
	console.log(iCount, tCount);
	db.get('twitter')
		.push({
			date: moment().format('MMMM Do YYYY, h:mm:ss a'),
			count: tCount,
		})
		.write();
	db.get('instagram')
		.push({ date: moment().format('MMMM Do YYYY, h:mm:ss a'), count: iCount })
		.write();
	console.log('Done!');
}
