import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../components/Message";

const Messages = ({ messages, name }) => {
	return (
		<ScrollToBottom className="messages">
			{messages.map((msg, idx) => (
				<Message key={idx} message={msg} name={name} />
			))}
		</ScrollToBottom>
	);
};
export default Messages;
