import { useCallback, useEffect, useState } from 'react';
import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from './requests';
import useSound from './useSound';

export type Launch = {
	flightNumber: number;
	mission: string;
	rocket: string;
	launchDate: string;
	target: string;
	customers: [string];
	upcoming: boolean;
	success: boolean;

	// "flightNumber": 100,
	// "mission": "Kepler Exploration X",
	// "rocket": "Explorer IS1",
	// "launchDate": "2030-12-27T05:00:00.000Z",
	// "target": "Kepler-442 b",
	// "customer": [
	// 	"NASA"
	// ],
	// "upcoming": true,
	// "success": true
};

function useLaunches() {
	const sound = useSound();
	const [launches, saveLaunches] = useState<Launch[]>([]);
	const [isPendingLaunch, setPendingLaunch] = useState(false);

	const getLaunches = useCallback(async () => {
		const fetchedLaunches = await httpGetLaunches();
		saveLaunches(fetchedLaunches);
	}, []);

	useEffect(() => {
		getLaunches();
	}, [getLaunches]);

	const submitLaunch = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setPendingLaunch(true);
			const data = new FormData(e.currentTarget);
			const launchDate = new Date(
				data.get('launch-day')?.toString() ?? '',
			).toString();
			const mission = data.get('mission-name')?.toString();
			const rocket = data.get('rocket-name')?.toString();
			const target = data.get('planets-selector')?.toString();
			const response = await httpSubmitLaunch({
				launchDate,
				mission,
				rocket,
				target,
			});

			const success = response.ok;
			if (success) {
				getLaunches();
				setTimeout(() => {
					setPendingLaunch(false);
					sound.click();
				}, 800);
			} else {
				sound.error();
				setPendingLaunch(false);
			}
		},
		[getLaunches, sound],
	);

	const abortLaunch = useCallback(
		async (id: number) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const response = await httpAbortLaunch(id);

			// TODO: Set success based on response.
			const success = response.ok;
			if (success) {
				getLaunches();
				sound.intro();
			} else {
				sound.error();
			}
		},
		[getLaunches, sound],
	);

	return {
		launches,
		isPendingLaunch,
		submitLaunch,
		abortLaunch,
	};
}

export default useLaunches;
