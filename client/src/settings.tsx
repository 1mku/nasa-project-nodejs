export const resources = {
	background: {
		small: "/img/background-small.jpg",
		medium: "/img/background-medium.jpg",
		large: "/img/background-large.jpg",
	},
	pattern: "/img/glow.png",
};

export const sounds = {
	shared: {
		volume: 0.5,
	},
	players: {
		click: {
			sound: { src: ["/sound/click.mp3"] },
			settings: { oneAtATime: true },
		},
		typing: {
			sound: { src: ["/sound/typing.mp3"] },
			settings: { oneAtATime: true },
		},
		deploy: {
			sound: { src: ["/sound/deploy.mp3"] },
			settings: { oneAtATime: true },
		},
		success: {
			sound: {
				src: ["/sound/success.mp3"],
				volume: 0.2,
			},
			settings: { oneAtATime: true },
		},
		abort: {
			sound: { src: ["/sound/abort.mp3"] },
			settings: { oneAtATime: true },
		},
		warning: {
			sound: { src: ["/sound/warning.mp3"] },
			settings: { oneAtATime: true },
		},
	},
};