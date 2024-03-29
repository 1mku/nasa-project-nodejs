import { useMemo } from 'react';
import type { Launch } from '@/hooks/useLaunches';

type Props = { launches: Launch[] };

const History = (props: Props) => {
	const tableBody = useMemo(() => {
		return props.launches
			?.filter((launch) => !launch.upcoming)
			.map((launch) => {
				return (
					<tr key={String(launch.flightNumber)}>
						<td>
							<span style={{ color: launch.success ? 'greenyellow' : 'red' }}>
								█
							</span>
						</td>
						<td>{launch.flightNumber}</td>
						<td>{new Date(launch.launchDate).toDateString()}</td>
						<td>{launch.mission}</td>
						<td>{launch.rocket}</td>
						<td>{launch.customers?.join(', ')}</td>
					</tr>
				);
			});
	}, [props.launches]);

	return (
		<article id="history">
			<p>
				History of mission launches including SpaceX launches starting from the
				year 2006.
			</p>

			<div style={{ overflow: 'auto' }}>
				<table style={{ tableLayout: 'fixed' }}>
					<thead>
						<tr>
							<th style={{ width: '2rem' }} />
							<th style={{ width: '3rem' }}>No.</th>
							<th style={{ width: '9rem' }}>Date</th>
							<th style={{ width: '9rem' }}>Mission</th>
							<th style={{ width: '7rem' }}>Rocket</th>
							<th style={{ width: '9rem' }}>Customers</th>
						</tr>
					</thead>
					<tbody>{tableBody}</tbody>
				</table>
			</div>
		</article>
	);
};

export default History;
