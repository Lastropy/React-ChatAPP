import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ key, currentUserId, message }) => {
	const {
		userId,
		content,
		user: { name },
	} = message;
	const isSentByCurrentUser = currentUserId === userId;

	return (
		<div key={key}>
			{isSentByCurrentUser ? (
				<div className="messageContainer justifyEnd">
					<p className="sentText pr-10">{name}</p>
					<div className="messageBox backgroundBlue">
						<p className="messageText colorWhite">{ReactEmoji.emojify(content)}</p>
					</div>
				</div>
			) : (
				<div className="messageContainer justifyStart">
					<div className="messageBox backgroundLight">
						<p className="messageText colorDark">{ReactEmoji.emojify(content)}</p>
					</div>
					<p className="sentText pl-10">{name}</p>
				</div>
			)}
		</div>
	);
};

export default Message;
