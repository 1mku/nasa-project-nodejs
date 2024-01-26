import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import { type CSSObject, Global } from "@emotion/react";
import { AnimatorGeneralProvider, BleepsProvider } from "@arwes/react";

import Launch from "./pages/Launch";
import History from "./pages/History";
import Upcoming from "./pages/Upcoming";

import usePlanets from "./hooks/usePlanets";
import useLaunches from "./hooks/useLaunches";
import { animatorsSettings, bleepsSettings, stylesBaseline } from "./settings";

const App = () => {
	const { launches, abortLaunch } = useLaunches();
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
								<Route
									path="/upcoming"
									element={
										<Upcoming launches={launches} abortLaunch={abortLaunch} />
									}
								/>
								<Route
									path="/history"
									element={<History launches={launches} />}
								/>
							</Route>
						</Routes>
					</Router>
				</AnimatorGeneralProvider>
			</BleepsProvider>
		</>
	);
};

export default App;
