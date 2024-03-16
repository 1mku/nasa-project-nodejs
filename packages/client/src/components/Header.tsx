import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Text, Animated } from '@arwes/react';

import useSound from '../hooks/useSound';
import fav from '/favicon.png';

const links = [
	{
		title: 'Launch',
		to: '/launch',
		icon: 'check_circle_outline',
	},
	{
		title: 'Upcoming',
		to: '/upcoming',
		icon: 'update',
	},
	{
		title: 'History',
		to: '/history',
		icon: 'history',
	},
];
const Header = () => {
	const sound = useSound();
	const getLinks = useCallback(() => {
		return links.map((link) => (
			<Animated key={link.to}>
				<Link to={link.to} onClick={() => sound.click()}>
					<i className="material-icons">check_circle_outline</i>
					{link.title}
				</Link>
			</Animated>
		));
	}, [sound]);

	return (
		<header className="header">
			<img
				src={fav}
				alt=""
				style={{
					margin: '15px 10px 15px 0',
					height: '50px',
					width: 'auto',
				}}
			/>

			<Text className="title" as="h1" style={{ margin: 0 }}>
				NASA Mission Control
			</Text>
			<nav children={getLinks()} />
		</header>
	);
};

export default Header;
