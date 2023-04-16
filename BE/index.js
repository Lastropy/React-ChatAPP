const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

server.listen(port, () => console.log(`Server running on ${port}`));
io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("disconnect", (reason) => {
    console.log("disconnected");
    console.log(reason);
  });
});
