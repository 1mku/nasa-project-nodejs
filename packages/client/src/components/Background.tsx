import { CSSProperties, type ReactElement } from 'react';
import { resources } from '../settings';

const classes: Record<string, CSSProperties> = {
	root: {
		display: 'block',
		overflow: 'hidden',

		zIndex: 0,
	},

	layer1: {
		display: 'block',
		position: 'absolute',
		overflow: 'hidden',
		top: 0,
		bottom: 0,
		zIndex: 1,
		inset: 0,
		transformOrigin: 'top',
		transitionProperty: 'opacity, filter',
		transitionDuration: '0.2s',
		transitionTimingFunction: 'ease-out',
	},

	layer1Image: {
		display: 'block',
		position: 'absolute',
		inset: -1,
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: 'center',
	},

	layer2: {
		zIndex: 2,
	},

	layer3: {
		zIndex: 3,
	},
};

export default function Background(): ReactElement {
	const { background: bg } = resources;
	return (
		<>
			<picture style={classes.layer1}>
				<source
					media="(min-width:1280px)"
					srcSet={bg.large}
					type="image/jpeg"
				/>
				<source
					media="(min-width:768px)"
					srcSet={bg.medium}
					type="image/jpeg"
				/>
				<img style={classes.layer1Image} src={bg.small} alt="Background" />
			</picture>
		</>
	);
}
