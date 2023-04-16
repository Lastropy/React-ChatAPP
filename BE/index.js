const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require("cors");
const port = process.env.PORT || 5000;

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
  console.log("new connection");

  socket.on("join", ({ name, room }, func) => {
    try {
      console.log(name, room);
    } catch (error) {
      func({ error: error.message });
    }
  });
  socket.on("disconnect", (reason) => {
    console.log("disconnected");
    console.log(reason);
  });
});
