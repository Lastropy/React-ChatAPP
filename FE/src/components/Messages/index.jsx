import React from "react";
import "../../assets/css/Messages.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

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
