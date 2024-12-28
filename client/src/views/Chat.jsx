import { useEffect, useState } from "react";
import io from "socket.io-client";
import InfoBar from "../components/InfoBar";
import Input from "../components/Input";
import Messages from "./Messages";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import Notification from "../components/Notification";
import LoadingAnimation from "../components/LoadingAnimation";

const Chat = ({ roomConnectInfo }) => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const { roomName, roomPwd, userId } = roomConnectInfo;
	const [accessToken, setAccessToken] = useState(undefined);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [socket, setSocket] = useState(undefined);
	const [room, setRoom] = useState(undefined);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	const fetchToken = async () => {
		setAccessToken(await getAccessTokenSilently());
	};

	useEffect(() => {
		if (isAuthenticated) {
			fetchToken();
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (accessToken) {
			setSocket(
				io(import.meta.env.VITE_SERVER_ENDPOINT, {
					auth: { token: accessToken },
				})
			);
		}
	}, [accessToken]);

	useEffect(() => {
		return () => {
			if (socket) {
				socket.disconnect();
				socket.off();
			}
		};
	}, []);

	useEffect(() => {
		if (socket && accessToken) {
			setLoading(true);
			socket.on("connect_error", (err) => {
				Notification.error(err.message);
				setLoading(false);
			});
			socket.emit("joinIfExists:room", { roomName, roomPwd, userUUID: userId }, (arg) => {
				if (arg.error) {
					Notification.error("Incorrect Room Name or Password.");
					setLoading(false);
					navigate("/room");
				} else {
					Notification.success("Successfully connected to room.");
					setRoom(arg);
					setLoading(false);
				}
			});
		}
	}, [socket, accessToken, roomConnectInfo]);

	useEffect(() => {
		if (room) {
			setLoading(true);
			Notification.info(`Getting existing messages for ${room.name}`);
			socket.emit("getForARoom:messages", { roomId: room.id }, (arg) => {
				if (arg.error) {
					Notification.error("Error while fetching messages from room.");
					setLoading(false);
					throw new Error("Error in fetching messages from room");
				} else {
					Notification.success("Fetched Messages from room.");
					setMessages(arg);
					setLoading(false);
				}
			});
		}
	}, [room]);

	useEffect(() => {
		if (room) {
			socket.on("updateRoomClients", (arg) => {
				setMessages(messages.concat(arg));
			});
		}
	}, [room, messages]);

	const handleSend = (event) => {
		event.preventDefault();
		if (!room) Notification.error("Not connected to any room");
		if (!message) Notification.error("No message to send");
		if (message && room) {
			socket.emit(
				"create:message",
				{ content: message, roomId: room.id, userId, userName: user.name },
				(arg) => {
					if (arg.error) {
						Notification.error("Error while creating a new message in the room.");
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
					{isLoading ? (
						<LoadingAnimation noBackground />
					) : (
						<>
							<Messages messages={messages} currentUserId={userId} />
							<Input message={message} handleSend={handleSend} setMessage={setMessage} />
						</>
					)}
				</div>
			) : (
				<div style={{ color: "white" }}>No Name / Room provided</div>
			)}
		</div>
	);
};

export default Chat;
