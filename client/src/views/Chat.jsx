import queryString from "query-string";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import InfoBar from "../components/InfoBar";
import Input from "../components/Input";
import Messages from "./Messages";
let socket;

// ✅ location is a prop coming from react router
// ✅ we are passing data in one component to other component using query string
// ✅ location.search -> gives our data
const Chat = ({ location }) => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		setName(name);
		setRoom(room);
		socket = io(import.meta.env.VITE_SERVER_ENDPOINT);
		socket.emit("join", { name, room }, (error) => {
			if (error) {
				alert(error);
				window.history.back();
			}
		});

		// 🤔 Will execute on component unmount
		return () => {
			socket.disconnect();
			socket.off();
		};
	}, [location.search]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages(messages.concat(message));
		});
	}, [messages]);

	const sendMessage = (event) => {
		/* 🤔 
    Prevents rerender of whole page, as that's the default behaviour
    in React 
    */
		console.log("SENDING!!");
		event.preventDefault();
		if (message) {
			socket.emit("sendMessage", message, () => {
				setMessage("");
			});
		}
	};

	return (
		<div className="outerContainer">
			{name && room ? (
				<div className="container">
					<InfoBar roomName={room} />
					<Messages messages={messages} name={name} />
					<Input message={message} sendMessage={sendMessage} setMessage={setMessage} />
				</div>
			) : (
				<div style={{ color: "white" }}>No Name / Room provided</div>
			)}
		</div>
	);
};

export default Chat;
