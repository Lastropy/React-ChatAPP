import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../components/Message";

const Messages = ({ messages, currentUserId }) => {
	return (
		<ScrollToBottom className="messages">
			{messages.map((msg, idx) => (
				<Message key={idx} message={msg} currentUserId={currentUserId} />
			))}
		</ScrollToBottom>
	);
};
export default Messages;
