const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("../router");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(router);

server.listen(port, () => console.log(`Server running on ${port}`));

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callbackFunctionFromFrontEnd) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callbackFunctionFromFrontEnd(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.join(user.room);

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    callbackFunctionFromFrontEnd();
  });

  socket.on("sendMessage", (message, callbackFunctionFromFrontEnd) => {
    const user = getUser(socket.id);
    if (!user) return callbackFunctionFromFrontEnd(error);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callbackFunctionFromFrontEnd();
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnected");
    console.log(reason);
  });
});
