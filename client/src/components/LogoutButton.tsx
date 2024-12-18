import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
	const { logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
	useEffect(() => {
		console.log("isAuth2", isAuthenticated);
		if (isAuthenticated) {
			const getToken = async () => {
				const accessToken = await getAccessTokenSilently();
				console.log("auth token", accessToken);
			};
			getToken();
		}
	}, [isAuthenticated]);

	return <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>;
};

export default LogoutButton;
