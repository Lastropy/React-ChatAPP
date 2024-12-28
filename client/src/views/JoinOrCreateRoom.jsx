import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import SelectDropdown from "../components/SelectDropdown";
import Notification from "../components/Notification";
import LoadingAnimation from "../components/LoadingAnimation";

const JoinOrCreateRoom = () => {
	const [roomName, setRoomName] = useState("");
	const [roomPwd, setRoomPwd] = useState("");
	const [createOrJoin, setCreateOrJoin] = useState("create");
	const [userUpserted, setUserUpserted] = useState(false);
	const [userUUID, setUserUUID] = useState("");
	const [isLoading, setLoading] = useState(false);
	const [socket, setSocket] = useState(undefined);
	const [roomsDropdown, setRoomsDropDown] = useState([]);
	const navigate = useNavigate();
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [accessToken, setAccessToken] = useState(undefined);
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
				socket.off();
				socket.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		if (isAuthenticated && socket && accessToken) {
			setLoading(true);
			socket.on("connect_error", (err) => {
				console.log(err);
				Notification.error(err.message);
				setLoading(false);
			});
			const { name, email } = user;
			socket.emit("createIfNotExists:user", { name, email }, (arg) => {
				if (arg.error) {
					Notification.error("Error occured while upserting user");
					setUserUpserted(false);
					setLoading(false);
				} else {
					Notification.success("User successfully upserted");
					setUserUUID(arg.id);
					setUserUpserted(true);
					setLoading(false);
				}
			});
		}
	}, [isAuthenticated, user, socket, accessToken]);

	const toggleCheckbox = () => {
		if (createOrJoin === "create") {
			socket.emit("get:rooms", (arg) => {
				if (arg.error) {
					Notification.error("Error occured while fetching rooms");
				} else {
					Notification.info("Rooms successfully fetched");
					for (let i = 0; i < arg.length; i += 1) {
						arg[i].displayValue = `${arg[i].name} (Owner - ${arg[i].owner.name})`;
					}
					setRoomsDropDown(arg);
					setCreateOrJoin("join");
				}
			});
		} else setCreateOrJoin("create");
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (!roomName || !roomPwd) return Notification.error("Non-empty room name/password not acceptable.");
			if (createOrJoin === "create") {
				socket.emit("create:room", { roomName, roomPwd, userUUID }, (arg) => {
					if (arg.error) {
						Notification.error("Error occured while creating room");
						throw new Error("Error in creating room");
					} else {
						Notification.success("Room successfully created");
						navigate(`/chat?roomName=${roomName}&roomPwd=${roomPwd}&userId=${userUUID}`);
					}
				});
			} else navigate(`/chat?roomName=${roomName}&roomPwd=${roomPwd}&userId=${userUUID}`);
		} catch (error) {
			console.error("Error in handleSubmit", error);
		}
	};

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">
					{isLoading && !userUpserted && <LoadingAnimation />}
					{!isLoading && !userUpserted && "User not upserted. Please refresh the page."}
					{!isLoading && userUpserted && "Create / Join Room"}
				</h1>
				{!isLoading && userUpserted ? (
					<>
						<div>
							{createOrJoin === "create" ? (
								<input
									placeholder="Room Name"
									className="joinInput"
									type="text"
									onChange={(event) => setRoomName(event.target.value)}
								/>
							) : (
								<SelectDropdown
									data={roomsDropdown}
									valueField={"name"}
									displayField={"displayValue"}
									onChange={(event) => setRoomName(event.target.value)}
								/>
							)}
						</div>
						<div>
							<input
								placeholder="Room Password"
								className="joinInput mt-20"
								type="text"
								onChange={(event) => setRoomPwd(event.target.value)}
							/>
						</div>
						<div style={{ display: "flex" }}>
							<input type="checkbox" className="mt-20" onClick={toggleCheckbox} />
							<div style={{ color: "white", marginTop: "18px" }}>Join an existing room</div>
						</div>
						<button className="button mt-20" type="button" onClick={handleSubmit}>
							{createOrJoin === "create" ? "Create a new room" : "Join existing room"}
						</button>
					</>
				) : null}
			</div>
		</div>
	);
};

export default JoinOrCreateRoom;
