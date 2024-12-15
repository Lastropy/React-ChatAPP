import React from "react";
import onlineIcon from "../assets/img/onlineIcon.png";
import closeIcon from "../assets/img/closeIcon.png";

const InfoBar = ({ roomName }) => {
	return (
		<div className="infoBar">
			<div className="leftInnerContainer">
				<img className="onlineIcon" src={onlineIcon} alt="online" />
				<h3>{roomName}</h3>
			</div>
			<div className="rightInnerContainer">
				<a href="/">
					<img src={closeIcon} alt="close" />
				</a>
			</div>
		</div>
	);
};
export default InfoBar;
