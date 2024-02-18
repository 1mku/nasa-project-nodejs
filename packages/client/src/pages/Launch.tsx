import { useMemo } from 'react';
import useLaunches from '@/hooks/useLaunches';
import { Planet } from '@/hooks/usePlanets';
import { Animator, Text } from '@arwes/react';

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
		<Animator merge combine manager="stagger">
			<Animator>
				<Text as="h1">
					Futuristic science fiction user interface web framework.
				</Text>
			</Animator>
			<Animator>
				<Text as="p">
					Schedule a mission launch for interstellar travel to one of the Kepler
					Exoplanets.
				</Text>
			</Animator>
			<Animator>
				<Text>
					Only confirmed planets matching the following criteria are available
					for the earliest scheduled missions:
				</Text>
			</Animator>

			<Animator>
				<Text as="ul" style={{ marginBottom: '2rem' }}>
					<Text as="li">Planetary radius &lt; 1.6 times Earth's radius</Text>
					<Text as="li">
						Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11
						times Earth's value
					</Text>
				</Text>
			</Animator>
			<Animator>
				<Text as="div">
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
				</Text>
			</Animator>
		</Animator>
	);
};

export default Launch;
