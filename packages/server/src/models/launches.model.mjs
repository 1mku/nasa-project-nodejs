import { Launch } from './launches.mongo.mjs';
import { Planet } from './planets.mongo.mjs';

const DEFAULT_FLIGHT_NUMBER = 100;

const _launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 27, 2030'),
	target: 'Kepler-442 b',
	customers: ['NASA'],
	upcoming: true,
	success: true,
};

saveLaunch(_launch);

async function getAllLaunches() {
	return Launch.find({}, { __v: 0 });
}

async function getLatestFlightNumber() {
	const latestLaunch = await Launch
		.findOne()
		.sort('-flightNumber');

	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}

	return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
	const planet = await Planet.findOne({ kepler_name: launch.target });
	if (!planet) throw new Error('No matching planet found');

	await Launch.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, { upsert: true });
}

async function scheduleNewLaunch(launch) {
	const planet = await Planet.findOne({
		kepler_name: launch.target,
	});

	if (!planet) {
		throw new Error('No matching planet found');
	}

	const newFlightNumber = await getLatestFlightNumber() + 1;

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
	const aborted = await Launch.updateOne({
		flightNumber: launchId,
	}, {
		upcoming: false,
		success: false,
	});

	return aborted.modifiedCount === 1;
}


export { getAllLaunches, scheduleNewLaunch, existsLaunchWithId, abortLaunchById };
