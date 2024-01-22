import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import { type CSSObject, Global } from "@emotion/react";
import { createAppTheme, createAppStylesBaseline } from "@arwes/react";
import {
	type AnimatorGeneralProviderSettings,
	AnimatorGeneralProvider,
} from "@arwes/react";
import { type BleepsProviderSettings, BleepsProvider } from "@arwes/react";

import Launch from "./pages/Launch";
import History from "./pages/History";
import Upcoming from "./pages/Upcoming";

import usePlanets from "./hooks/usePlanets";
import useLaunches from "./hooks/useLaunches";

const theme = createAppTheme();
const stylesBaseline = createAppStylesBaseline(theme);

const animatorsSettings: AnimatorGeneralProviderSettings = {
	duration: {
		enter: 0.2,
		exit: 0.2,
		stagger: 0.04,
	},
};

const bleepsSettings: BleepsProviderSettings = {
	// Shared global audio settings.
	master: {
		volume: 0.9,
	},
	bleeps: {
		// A transition bleep sound to play when the user enters the app.
		intro: {
			sources: [
				{
					src: "https://arwes.dev/assets/sounds/intro.mp3",
					type: "audio/mpeg",
				},
			],
		},
		// An interactive bleep sound to play when user clicks.
		click: {
			sources: [
				{
					src: "https://arwes.dev/assets/sounds/click.mp3",
					type: "audio/mpeg",
				},
			],
		},
	},
};

const App = () => {
	// const onSuccessSound = () => sounds.success && sounds.success.play();
	// const onAbortSound = () => sounds.abort && sounds.abort.play();
	// const onFailureSound = () => sounds.warning && sounds.warning.play();

	// const { launches, isPendingLaunch, submitLaunch, abortLaunch } = useLaunches(
	// 	onSuccessSound,
	// 	onAbortSound,
	// 	onFailureSound,
	// );

	const planets = usePlanets();

	return (
		<>
			<Global styles={stylesBaseline as Record<string, CSSObject>} />
			<BleepsProvider {...bleepsSettings}>
				<AnimatorGeneralProvider {...animatorsSettings}>
					<Router>
						<Routes>
							<Route path="/" element={<AppLayout />}>
								<Route index element={<Launch planets={planets} />} />
								<Route path="/launch" element={<Launch planets={planets} />} />
								<Route path="/upcoming" element={<Upcoming />} />
								<Route path="/history" element={<History />} />
							</Route>
						</Routes>
					</Router>
				</AnimatorGeneralProvider>
			</BleepsProvider>
		</>
	);
};

export default App;
