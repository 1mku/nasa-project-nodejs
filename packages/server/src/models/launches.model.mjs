import axios from 'axios';

import { Launch } from './launches.mongo.mjs';
import { Planet } from './planets.mongo.mjs';
import { DEFAULT_FLIGHT_NUMBER, SPACEX_API_URL } from '#constants.mjs';

async function populateLaunches() {
	console.log('Downloading launch data...');
	const response = await axios.post(SPACEX_API_URL, {
		query: {},
		options: {
			pagination: false,
			populate: [
				{
					path: 'rocket',
					select: {
						name: 1,
					},
				},
				{
					path: 'payloads',
					select: {
						customers: 1,
					},
				},
			],
		},
	});

	if (response.status !== 200) {
		console.log('Problem downloading launch data');
		throw new Error('Launch data download failed');
	}

	const launchDocs = response.data.docs;
	for (const launchDoc of launchDocs) {
		const payloads = launchDoc.payloads;
		const customers = payloads.flatMap((payload) => {
			return payload.customers;
		});

		const launch = {
			flightNumber: launchDoc.flight_number,
			mission: launchDoc.name,
			rocket: launchDoc.rocket.name,
			launchDate: launchDoc.date_local,
			upcoming: launchDoc.upcoming,
			success: launchDoc.success,
			customers,
		};

		console.log(`${launch.flightNumber} ${launch.mission}`);

		await saveLaunch(launch);
	}
}

async function loadLaunchData() {
	const firstLaunch = await findLaunch({
		flightNumber: 1,
		rocket: 'Falcon 1',
		mission: 'FalconSat',
	});
	if (firstLaunch) {
		console.log('Launch data already loaded!');
	} else {
		await populateLaunches();
	}
}

async function getAllLaunches(skip, limit) {
	return Launch.find({}, { __v: 0 }).sort({ flightNumber: 1 }).skip(skip).limit(limit);
}

async function getLatestFlightNumber() {
	const latestLaunch = await Launch.findOne().sort('-flightNumber');

	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}

	return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
	await Launch.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
		upsert: true,
	});
}

async function scheduleNewLaunch(launch) {
	const planet = await Planet.findOne({
		kepler_name: launch.target,
	});

	if (!planet) {
		throw new Error('No matching planet found');
	}

	const newFlightNumber = (await getLatestFlightNumber()) + 1;
	const newLaunch = Object.assign(launch, {
		success: true,
		upcoming: true,
		customers: ['NASA'],
		flightNumber: newFlightNumber,
	});

	await saveLaunch(newLaunch);
}

async function findLaunch(filter) {
	return await Launch.findOne(filter);
}

async function existsLaunchWithId(launchId) {
	return await findLaunch({
		flightNumber: launchId,
	});
}

async function abortLaunchById(launchId) {
	const aborted = await Launch.updateOne(
		{
			flightNumber: launchId,
		},
		{
			upcoming: false,
			success: false,
		},
	);

	return aborted.modifiedCount === 1;
}

export {
	getAllLaunches,
	scheduleNewLaunch,
	existsLaunchWithId,
	abortLaunchById,
	loadLaunchData,
};
