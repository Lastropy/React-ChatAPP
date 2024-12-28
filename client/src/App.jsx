import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import "./assets/css/index.css";
import { ProtectedRoute } from "./components/ProtectedRoute";

const JoinOrCreateRoom = React.lazy(() => import("./views/JoinOrCreateRoom"));
const Chat = React.lazy(() => import("./views/Chat"));
const NotFound = React.lazy(() => import("./views/NotFound"));
const Start = React.lazy(() => import("./views/Start"));
const Header = React.lazy(() => import("./components/Header"));

export const App = () => {
	const [roomConnectInfo, setRoomConnectInfo] = useState(undefined);
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
							<ProtectedRoute
								component={JoinOrCreateRoom}
								setRoomConnectInfo={setRoomConnectInfo}
							/>
						</React.Suspense>
					}
				/>
				<Route
					path="/chat"
					exact
					element={
						<React.Suspense fallback={<LoadingAnimation />}>
							<ProtectedRoute component={Chat} roomConnectInfo={roomConnectInfo} />
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
