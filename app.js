import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();
const httpServer = createServer();
const port = process.env.PORT || 4001;
httpServer.listen(port, () => {
  console.log("listening on " + port);
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
io.sockets.on("connection", (socket) => {
  socket.on("send-message", (message) => {
    io.sockets.emit("receive-message", message);
  });
});
