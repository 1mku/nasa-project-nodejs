import { useMemo } from 'react';
import useLaunches from '@/hooks/useLaunches';
import { Planet } from '@/hooks/usePlanets';
import { Animated, Animator } from '@arwes/react';

type Props = { planets: Planet[] };
const Launch = (props: Props) => {
	const { submitLaunch, isPendingLaunch } = useLaunches();

	const selectorBody = useMemo(() => {
		return props.planets?.map((planet) => (
			<option value={planet.kepler_name} key={planet.kepler_name}>
				{planet.kepler_name}
			</option>
		));
	}, [props.planets]);

	const today = new Date().toISOString().split('T')[0];

	const Loading = () => <div>Loading...</div>;
	return (
		<div>
			<Animator>
				<Animated
					animated={{
						initialStyle: { x: -100, opacity: 0 },
						transitions: {
							entering: { x: [-100, 0], opacity: 1 },
						},
					}}
				>
					<p>
						Schedule a mission launch for interstellar travel to one of the
						Kepler Exoplanets.
					</p>
					<p>
						Only confirmed planets matching the following criteria are available
						for the earliest scheduled missions:
					</p>
					<ul>
						<li>Planetary radius &lt; 1.6 times Earth's radius</li>
						<li>
							Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11
							times Earth's value
						</li>
					</ul>
					<form
						onSubmit={submitLaunch}
						style={{
							display: 'inline-grid',
							gridTemplateColumns: 'auto auto',
							gridGap: '10px 20px',
						}}
					>
						<label htmlFor="launch-day">Launch Date</label>
						<input
							type="date"
							id="launch-day"
							name="launch-day"
							min={today}
							max="2040-12-31"
							defaultValue={today}
						/>
						<label htmlFor="mission-name">Mission Name</label>
						<input type="text" id="mission-name" name="mission-name" />
						<label htmlFor="rocket-name">Rocket Type</label>
						<input
							type="text"
							id="rocket-name"
							name="rocket-name"
							defaultValue="Explorer IS1"
						/>
						<label htmlFor="planets-selector">Destination Exoplanet</label>
						<select id="planets-selector" name="planets-selector">
							{selectorBody}
						</select>

						<button type="submit" disabled={isPendingLaunch}>
							Launch Mission ✔
						</button>

						{isPendingLaunch && <Loading />}
					</form>
				</Animated>
			</Animator>
		</div>
	);
};

export default Launch;
