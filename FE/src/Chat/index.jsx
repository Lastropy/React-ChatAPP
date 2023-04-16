import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { ENDPOINT } from "../assets/constants";
let socket;

// ✅ location is a prop coming from react router
// ✅ we are passing data in one component to other component using query string
// ✅ location.search -> gives our data
const Chat = ({ location }) => {
  const [name, setName] = useState();
  const [room, setRoom] = useState();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(root);

    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, ({ error }) => {
      console.log(
        `Error encountered in Backend -> `,
        JSON.stringify(error, null, 2)
      );
    });
  }, [location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
