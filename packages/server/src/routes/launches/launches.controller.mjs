import {
	getAllLaunches,
	scheduleNewLaunch,
	existsLaunchWithId,
	abortLaunchById,
} from '#models/launches.model.mjs';

async function httpGetAllLaunches(_req, res) {
	return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
	const launch = req.body;

	// Validate request data
	if (
		!launch.mission ||
		!launch.rocket ||
		!launch.launchDate ||
		!launch.target
	) {
		return res.status(400).json({
			error: 'Missing required property',
		});
	}

	launch.launchDate = new Date(launch.launchDate);
	if (launch.launchDate.toString() === 'Invalid Date') {
		return res.status(400).json({
			error: 'Invalid launch date',
		});
	}

	await scheduleNewLaunch(launch);
	return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
	const launchId = Number(req.params.id);

	const existsLaunch = await existsLaunchWithId(launchId);
	if (!existsLaunch) {
		return res.status(404).json({
			error: 'Launch not found',
		});
	}

	const aborted = await abortLaunchById(launchId);
	if (!aborted) {
		return res.status(400).json({
			error: 'Launch not aborted',
		});
	}

	return res.status(200).json({
		ok: true,
	});
}

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
