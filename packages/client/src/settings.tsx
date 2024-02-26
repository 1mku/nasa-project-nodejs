import {
	AnimatorGeneralProviderSettings,
	AppTheme,
	BleepsProviderSettings,
	createAppStylesBaseline,
	createAppTheme,
} from '@arwes/react';

export const resources = {
	background: {
		small: '/img/background.jpg',
		medium: '/img/background-medium.jpg',
		large: '/img/background-large.jpg',
	},
	pattern: '/img/glow.png',
};

export const sounds = {
	shared: {
		volume: 0.5,
	},
	players: {
		click: {
			sound: { src: ['/sound/click.mp3'] },
			settings: { oneAtATime: true },
		},
		typing: {
			sound: { src: ['/sound/typing.mp3'] },
			settings: { oneAtATime: true },
		},
		deploy: {
			sound: { src: ['/sound/deploy.mp3'] },
			settings: { oneAtATime: true },
		},
		success: {
			sound: {
				src: ['/sound/success.mp3'],
				volume: 0.2,
			},
			settings: { oneAtATime: true },
		},
		abort: {
			sound: { src: ['/sound/abort.mp3'] },
			settings: { oneAtATime: true },
		},
		warning: {
			sound: { src: ['/sound/warning.mp3'] },
			settings: { oneAtATime: true },
		},
	},
};

export type BleepNames = 'click' | 'intro' | 'error';
export const bleepsSettings: BleepsProviderSettings<BleepNames> = {
	// Shared global audio settings.
	master: {
		volume: 0.9,
	},
	bleeps: {
		// A transition bleep sound to play when the user enters the app.
		intro: {
			sources: [
				{
					src: 'https://arwes.dev/assets/sounds/intro.mp3',
					type: 'audio/mpeg',
				},
			],
		},
		// An interactive bleep sound to play when user clicks.
		click: {
			sources: [
				{
					src: 'https://arwes.dev/assets/sounds/click.mp3',
					type: 'audio/mpeg',
				},
			],
		},
		error: {
			sources: [
				{
					src: 'https://arwes.dev/assets/sounds/error.mp3',
					type: 'audio/mpeg',
				},
			],
		},
	},
};

export const theme: AppTheme = createAppTheme({
	settings: {
		hues: {
			primary: 200,
			secondary: 80,
		},
		fontFamilies: {
			title: 'Copperplate, Copper, "Comic Sans"',
			body: 'Tahoma, Techno, Trebuchet',
		},
	},
});
export const stylesBaseline = createAppStylesBaseline(theme);

export const animatorsSettings: AnimatorGeneralProviderSettings = {
	duration: {
		enter: 0.2,
		exit: 0.2,
		stagger: 0.04,
	},
};
