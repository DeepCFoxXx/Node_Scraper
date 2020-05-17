import moment from 'moment';

function isInLastSixHours(timestamp) {
	const sixHoursAgo = 1000 * 60 * 60 * 6;
	if (Date.now() - timestamp < sixHoursAgo) {
		return true;
	}
	return false;
}

export default function aggregate(scrapes) {
	const dateNow = moment().format('MMMM Do YYYY, h:mm:ss a');
	const aggregateScrapes = [...scrapes]
		.reverse()
		.map((scrape) => {
			const date = new Date(scrape.date);
			const optionalHour = isInLastSixHours(scrape.date) ? `-${date.getHours()}` : ``;
			const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}${optionalHour}`;
			return {
				key,
				...scrape,
			};
		})
		.reduce((accumulator, currentScrape) => {
			if (!accumulator.find((scrape) => scrape.key === currentScrape.key)) {
				return [...accumulator, currentScrape];
			}
			return accumulator;
		}, [])
		.reverse();
	return aggregateScrapes;
}
