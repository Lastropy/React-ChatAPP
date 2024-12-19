import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import LoadingAnimation from "./LoadingAnimation";

export const ProtectedRoute = ({ component, ...props }) => {
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => <LoadingAnimation />,
	});

	return <Component {...props} />;
};
