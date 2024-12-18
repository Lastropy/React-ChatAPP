import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	useEffect(() => {
		console.log("isAuth1", isAuthenticated);
	}, [isAuthenticated]);

	return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
