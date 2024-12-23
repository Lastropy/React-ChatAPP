import queryString from "query-string";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import InfoBar from "../components/InfoBar";
import Input from "../components/Input";
import Messages from "./Messages";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

const Chat = ({ location }) => {
	const { user } = useAuth0();
	const { roomName, roomPwd, userId } = queryString.parse(location.search);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [socket, setSocket] = useState(undefined);
	const [room, setRoom] = useState(undefined);
	const navigate = useNavigate();

	useEffect(() => {
		setSocket(io(import.meta.env.VITE_SERVER_ENDPOINT));
		return () => {
			if (socket) {
				socket.disconnect();
				socket.off();
			}
		};
	}, []);

	useEffect(() => {
		if (socket) {
			socket.emit("joinIfExists:room", { roomName, roomPwd, userUUID: userId }, (arg) => {
				if (arg.error) {
					alert("Error while connecting to room.");
					console.error(arg.error);
					navigate("/room");
				} else {
					alert("Successfully connected to room.");
					setRoom(arg);
				}
			});
		}
	}, [socket, location.search]);

	useEffect(() => {
		if (room) {
			alert(`Getting existing messages for ${room.name}`);
			socket.emit("getForARoom:messages", { roomId: room.id }, (arg) => {
				if (arg.error) {
					alert("Error while fetching messages from room.");
					console.error(arg.error);
					throw new Error("Error in fetching messages from room");
				} else {
					alert("Fetched Messages from room.");
					setMessages(arg);
				}
			});
		}
	}, [room]);

	useEffect(() => {
		if (room) {
			socket.on("updateRoomClients", (arg) => {
				alert("Recieving message from other room clients...");
				setMessages(messages.concat(arg));
			});
		}
	}, [room, messages]);

	const handleSend = (event) => {
		event.preventDefault();
		if (!room) alert("Not connected to any room");
		if (!message) alert("No message to send");
		if (message && room) {
			socket.emit(
				"create:message",
				{ content: message, roomId: room.id, userId, userName: user.name },
				(arg) => {
					if (arg.error) {
						alert("Error while creating a new message in the room.");
						console.error(arg.error);
						throw new Error("Error in creating a new message in the room");
					} else {
						setMessage("");
					}
				}
			);
		}
	};

	return (
		<div className="outerContainer">
			{roomName && roomPwd && user ? (
				<div className="container">
					<InfoBar roomName={roomName} />
					<Messages messages={messages} currentUserId={userId} />
					<Input message={message} handleSend={handleSend} setMessage={setMessage} />
				</div>
			) : (
				<div style={{ color: "white" }}>No Name / Room provided</div>
			)}
		</div>
	);
};

export default Chat;
