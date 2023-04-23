import React from "react";
import "../../../assets/css/Message.css";

const Message = ({ key, name, message }) => {
  const { user, text } = message;
  const trimmedName = name.trim().toLowerCase();
  const isSentByCurrentUser = user === trimmedName;

  return (
    <div key={key}>
      {isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{user}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{text}</p>
          </div>
          <p className="sentText pl-10">{user}</p>
        </div>
      )}
    </div>
  );
};

export default Message;