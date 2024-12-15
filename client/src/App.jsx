import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import "./assets/css/index.css";

const Join = React.lazy(() => import("./views/Join"));
const Chat = React.lazy(() => import("./views/Chat"));

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					exact
					element={
						<React.Suspense fallback={<LoadingAnimation />}>
							<Join />
						</React.Suspense>
					}
				/>
				<Route
					path="/chat"
					exact
					element={
						<React.Suspense fallback={<LoadingAnimation />}>
							<Chat location={location} />
						</React.Suspense>
					}
				/>
			</Routes>
		</Router>
	);
};
