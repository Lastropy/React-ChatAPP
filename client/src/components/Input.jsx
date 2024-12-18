import React from "react";

const Input = ({ message, setMessage, handleSend }) => {
	return (
		<form className="form">
			<input
				className="input"
				type="text"
				value={message}
				placeholder="Type a message..."
				onChange={(event) => setMessage(event.target.value)}
				onKeyDown={(event) => (event.key === "Enter" ? handleSend(event) : null)}
			/>
			<button className="sendButton" onClick={(event) => handleSend(event)}>
				Send
			</button>
		</form>
	);
};
export default Input;
