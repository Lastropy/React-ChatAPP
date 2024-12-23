import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import ProfileImage from "./ProfileImage";

const Header = () => {
	const { isAuthenticated, user } = useAuth0();
	const [isError, setIsError] = useState(false);

	if (!isAuthenticated || !user) return null;
	return (
		<header className="header-style">
			<div className="content-style">
				{!isError ? (
					<img
						src={user.picture}
						alt={`${user.name}'s profile`}
						className="header-profile-image"
						onError={(e) => setIsError(true)}
					/>
				) : (
					<ProfileImage name={user.name} />
				)}
				<span className="header-user-info">{`${user.name} (${user.email})`}</span>
			</div>
			{isAuthenticated && <LogoutButton />}
		</header>
	);
};

export default Header;
