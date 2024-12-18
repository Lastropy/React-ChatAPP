import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import "./assets/css/index.css";

const JoinOrCreateRoom = React.lazy(() => import("./views/JoinOrCreateRoom"));
const Chat = React.lazy(() => import("./views/Chat"));
const NotFound = React.lazy(() => import("./views/NotFound"));
const Start = React.lazy(() => import("./views/Start"));
const Header = React.lazy(() => import("./components/Header"));

export const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route
					path="/"
					exact
					element={
						<React.Suspense fallback={<LoadingAnimation />}>
							<Start />
						</React.Suspense>
					}
				/>
				<Route
					path="/room"
					exact
					element={
						<React.Suspense fallback={<LoadingAnimation />}>
							<JoinOrCreateRoom />
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
				<Route
					path="*"
					element={
						<React.Suspense fallback={<LoadingAnimation />}>
							<NotFound />
						</React.Suspense>
					}
				/>
			</Routes>
		</Router>
	);
};
