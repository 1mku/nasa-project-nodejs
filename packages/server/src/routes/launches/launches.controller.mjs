import {
	getAllLaunches,
	addNewLaunch,
	existsLaunchWithId,
	abortLaunch,
} from '../../models/launches.model.mjs';

function httpGetAllLaunches(_req, res) {
	return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
	const launch = req.body;

	// Validate request data
	if (
		!launch.mission ||
		!launch.rocket ||
		!launch.launchDate ||
		!launch.destination
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

	addNewLaunch(launch);
	return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
	const launchId = Number(req.params.id);
	console.log({ launchId });
	console.log({ exist: existsLaunchWithId(launchId) });
	if (!existsLaunchWithId(launchId)) {
		return res.status(404).json({ error: 'Launch not found' });
	}

	const launch = abortLaunch(launchId);
	return res.status(200).json({ aborted: launch });
}

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
