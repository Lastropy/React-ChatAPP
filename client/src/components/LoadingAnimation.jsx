import React from "react";

const LoadingAnimation = ({ noBackground = false }) => {
	return (
		<div className={"loader-container " + (!noBackground && "loader-background")}>
			<div className="loader" />
		</div>
	);
};

export default LoadingAnimation;
