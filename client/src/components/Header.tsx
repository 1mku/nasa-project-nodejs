import { Text, Animator } from "@arwes/react";
import { Link } from "react-router-dom";
import fav from "/favicon.png";

const Header = (props) => {
	const { classes = {} } = props;
	return (
		<header className="header">
			<img
				src={fav}
				alt=""
				className={classes.img}
				style={{
					margin: "15px 10px 15px 0",
					height: "50px",
					width: "auto",
				}}
			/>
			<Animator active={true} combine manager="sequence">
				<Animator>
					<Text as="h1" style={{ margin: 0 }}>
						NASA Mission Control
					</Text>
				</Animator>
				<Animator>
					<nav>
						<Link className={classes.link} to="/launch">
							<i className="material-icons">check_circle_outline</i>Launch
						</Link>

						<Link className={classes.link} to="/upcoming">
							<i className="material-icons">update</i>Upcoming
						</Link>

						<Link className={classes.link} to="/history">
							<i className="material-icons">history</i>History
						</Link>
					</nav>
				</Animator>
			</Animator>
		</header>
	);
};

export default Header;
