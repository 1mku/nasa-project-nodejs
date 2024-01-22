import { Outlet } from "react-router-dom";

import Centered from "../components/Centered";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = () => {
	return (
		<>
			<Header />
			<main style={{ padding: "2rem" }}>
				<Centered>
					<Outlet />
				</Centered>
			</main>
			<Footer />
		</>
	);
};

export default AppLayout;
