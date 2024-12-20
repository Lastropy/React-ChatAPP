import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const JoinOrCreateRoom = () => {
	const [roomName, setRoomName] = useState("");
	const [roomPwd, setRoomPwd] = useState("");
	const [createOrJoin, setCreateOrJoin] = useState("create");
	const [userUpserted, setUserUpserted] = useState(false);
	const [userUUID, setUserUUID] = useState("");
	const [isLoading, setLoading] = useState(false);
	const [socket, setSocket] = useState(undefined);
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuth0();

	useEffect(() => {
		setSocket(io(import.meta.env.VITE_SERVER_ENDPOINT));
		return () => {
			if (socket) {
				socket.off();
				socket.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		if (isAuthenticated && socket) {
			setLoading(true);
			const { name, email } = user;
			socket.emit("createIfNotExists:user", { name, email }, (arg) => {
				if (arg.error) {
					alert("Error occured while upserting user");
					console.error(arg.error);
					setUserUpserted(false);
					setLoading(false);
				} else {
					alert("User successfully upserted");
					setUserUUID(arg.id);
					setUserUpserted(true);
					setLoading(false);
				}
			});
		}
	}, [isAuthenticated, user, socket]);

	const toggleCheckbox = () => {
		if (createOrJoin === "create") setCreateOrJoin("join");
		else setCreateOrJoin("create");
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (!roomName || !roomPwd) return alert("Non-empty room name/password not acceptable.");
			if (createOrJoin === "create") {
				socket.emit("create:room", { roomName, roomPwd, userUUID }, (arg) => {
					if (arg.error) {
						alert("Error occured while creating room");
						console.error(arg.error);
						throw new Error("Error in creating room");
					} else {
						alert("Room successfully created");
						navigate(`/chat?roomName=${roomName}&roomPwd=${roomPwd}`);
					}
				});
			} else navigate(`/chat?roomName=${roomName}&roomPwd=${roomPwd}`);
		} catch (error) {
			console.error("Error in handleSubmit", error);
		}
	};

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">
					{isLoading && !userUpserted && "Loading..."}
					{!isLoading && !userUpserted && "User not upserted. Please refresh the page."}
					{!isLoading && userUpserted && "Create / Join Room"}
				</h1>
				{!isLoading && userUpserted ? (
					<>
						<div>
							<input
								placeholder="Room Name"
								className="joinInput"
								type="text"
								onChange={(event) => setRoomName(event.target.value)}
							/>
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
