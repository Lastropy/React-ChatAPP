import queryString from "query-string";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import InfoBar from "../components/InfoBar";
import Input from "../components/Input";
import Messages from "./Messages";
import { useAuth0 } from "@auth0/auth0-react";
let socket;

const Chat = ({ location }) => {
	const { user, isAuthenticated } = useAuth0();
	const { roomName, roomPwd } = queryString.parse(location.search);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (isAuthenticated) {
			socket = io(import.meta.env.VITE_SERVER_ENDPOINT);
			const { name } = user;
			// Verify before joining
			socket.emit("join", { name, roomName, roomPwd }, (error) => {
				if (error) {
					alert(error);
					window.history.back();
				}
			});

			socket.on("message", (message) => {
				setMessages(messages.concat(message));
			});

			return () => {
				socket.disconnect();
				socket.off();
			};
		}
	}, [location.search, isAuthenticated]);

	const handleSend = (event) => {
		event.preventDefault();
		if (message) {
			socket.emit("sendMessage", message, () => {
				setMessage("");
			});
		}
	};

	return (
		<div className="outerContainer">
			{roomName && roomPwd && user ? (
				<div className="container">
					<InfoBar roomName={roomName} />
					<Messages messages={messages} name={user?.name ?? ""} />
					<Input message={message} handleSend={handleSend} setMessage={setMessage} />
				</div>
			) : (
				<div style={{ color: "white" }}>No Name / Room provided</div>
			)}
		</div>
	);
};

export default Chat;
