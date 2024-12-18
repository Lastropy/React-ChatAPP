import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
	const { isAuthenticated, user } = useAuth0();
	return !isAuthenticated ? null : (
		<div style={{ backgroundColor: "#1A1A1D", color: "white" }}>{`${user.name} (${user.email}) `}</div>
	);
};

export default Header;
