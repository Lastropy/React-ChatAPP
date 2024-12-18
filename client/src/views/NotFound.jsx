import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="joinOuterContainer" style={{ display: "block", alignContent: "center" }}>
			<div style={{ color: "white", fontSize: "50px" }}>Path not found</div>
			<button style={{ width: "30%" }} className="button mt-20" type="button" onClick={() => navigate("/")}>
				Go to Start Page
			</button>
		</div>
	);
};

export default NotFound;
