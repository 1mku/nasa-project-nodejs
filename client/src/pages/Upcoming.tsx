import { useMemo } from "react";
import { Link } from "react-router-dom";

import Clickable from "../components/Clickable";
import { Launch } from "../hooks/useLaunches";

const Upcoming = (props: {
	launches: Launch[];
	abortLaunch: (flightNumber: number) => void;
}) => {
	const { launches = [], abortLaunch } = props;

	const tableBody = useMemo(() => {
		return launches
			?.filter((launch) => launch.upcoming)
			.map((launch) => {
				return (
					<tr key={String(launch.flightNumber)}>
						<td>
							<Clickable>
								<Link
									to="#"
									onClick={() => abortLaunch?.(launch.flightNumber)}
									children={"✖"}
								/>
							</Clickable>
						</td>
						<td children={launch.flightNumber} />
						<td children={new Date(launch.launchDate).toDateString()} />
						<td children={launch.mission} />
						<td children={launch.rocket} />
						<td children={launch.destination} />
					</tr>
				);
			});
	}, [launches, abortLaunch]);

	return (
		<div>
			<p>
				Upcoming missions including both SpaceX launches and newly scheduled
				Zero to Mastery rockets.
			</p>
			<p>Warning! Clicking on the ✖ aborts the mission.</p>

			<table style={{ tableLayout: "fixed" }}>
				<thead>
					<tr>
						<th style={{ width: "3rem" }} />
						<th style={{ width: "3rem" }}>No.</th>
						<th style={{ width: "10rem" }}>Date</th>
						<th style={{ width: "11rem" }}>Mission</th>
						<th style={{ width: "11rem" }}>Rocket</th>
						<th>Destination</th>
					</tr>
				</thead>
				<tbody>{tableBody}</tbody>
			</table>
		</div>
	);
	//   <Table animate show={entered}>

	//   </Table>
};

// export default withStyles(styles)(Upcoming);
export default Upcoming;
