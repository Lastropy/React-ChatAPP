import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { App } from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<Auth0Provider
		domain="dev-bi0d2wq8tzdpbefk.us.auth0.com"
		clientId="RXKn0vG3c9aq5ximPwCyTwP11wHy6ViX"
		authorizationParams={{
			redirect_uri: "http://localhost:5173/room",
			audience: "http://localhost:5000",
			scope: "read:users read:rooms read:messages create:users create:rooms create:messages profile email",
		}}
		useRefreshTokens={true}
	>
		<App />
	</Auth0Provider>
);
