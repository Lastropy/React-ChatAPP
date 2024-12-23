import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";
import { App } from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<Auth0Provider
		domain={import.meta.env.VITE_AUTH0_DOMAIN}
		clientId={import.meta.env.VITE_CLIENT_ID}
		authorizationParams={{
			redirect_uri: import.meta.env.VITE_REDIRECT_URI,
			audience: import.meta.env.VITE_SERVER_ENDPOINT,
			scope: import.meta.env.VITE_AUTH_SCOPE,
		}}
		useRefreshTokens={true}
	>
		<ReactNotifications />
		<App />
	</Auth0Provider>
);
