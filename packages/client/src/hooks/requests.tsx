import { API_URL } from '@/constants';
import { Launch } from '@/hooks/useLaunches';

// Load planets and return as JSON.
async function httpGetPlanets() {
	const response = await fetch(`${API_URL}/planets`);
	return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches(): Promise<Launch[]> {
	const response = await fetch(`${API_URL}/launches`);
	const fetchedLaunches: Launch[] = await response.json();
	return fetchedLaunches.sort((a, b) => {
		return a.flightNumber - b.flightNumber;
	});
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch: Partial<Launch>) {
	try {
		return await fetch(`${API_URL}/launches`, {
			method: 'POST',
			body: JSON.stringify(launch),
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

async function httpAbortLaunch(id: number) {
	try {
		return await fetch(`${API_URL}/launches/${id}`, {
			method: 'DELETE',
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
