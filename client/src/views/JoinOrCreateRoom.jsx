import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinOrCreateRoom = () => {
	const [roomName, setRoomName] = useState("");
	const [roomPwd, setRoomPwd] = useState("");
	const [createOrJoin, setCreateOrJoin] = useState("create");
	const navigate = useNavigate();

	const toggleCheckbox = () => {
		if (createOrJoin === "create") setCreateOrJoin("join");
		else setCreateOrJoin("create");
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (!roomName || !roomPwd) return alert("Non-empty room name/password not acceptable.");
			if (createOrJoin === "create") {
				// API Call to create a room
			}
			navigate(`/chat?roomName=${roomName}&roomPwd=${roomPwd}`);
		} catch (error) {
			console.error("Error in ");
		}
	};

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">Create / Join Room</h1>
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
			</div>
		</div>
	);
};

export default JoinOrCreateRoom;
