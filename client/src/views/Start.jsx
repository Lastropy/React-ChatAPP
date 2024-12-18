import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Start = () => {
	const { loginWithRedirect } = useAuth0();
	return (
		<div className="joinOuterContainer" style={{ display: "block", alignContent: "center" }}>
			<div style={{ color: "white", fontSize: "40px" }}>Click to start the app</div>
			<button
				style={{ width: "30%" }}
				className="button mt-20"
				type="button"
				onClick={() => loginWithRedirect()}
			>
				Start App
			</button>
		</div>
	);
};

export default Start;
