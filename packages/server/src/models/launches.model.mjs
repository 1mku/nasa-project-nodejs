const launches = new Map();

let latestFlightNumber = 100;

const _launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customers: ['NASA'],
    upcoming: true,
    success: true
}

launches.set(_launch.flightNumber, _launch)

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(lauch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(lauch, {
        success: true,
        upcoming: true,
        customers: ['NASA'],
        flightNumber: latestFlightNumber,
    }))
}

function existsLaunchWithId(id) {
    return launches.has(id);
}

function abortLaunch(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

export {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunch,
}