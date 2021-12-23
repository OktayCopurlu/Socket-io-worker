import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const port = process.env.PORT || 4001;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
server.listen(port, () => {
  console.log("listening on " + port);
});
// httpServer.listen(port, () => {
//   console.log("listening on " + port);
// });

// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });
io.sockets.on("connection", (socket) => {
  socket.on("send-message", (message) => {
    io.sockets.emit("receive-message", message);
  });
});
