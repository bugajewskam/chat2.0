import { Server } from "socket.io";
import messagesList from "../components/lists";

export function setupHandlers(io: Server) {
  io.on("connection", (socket) => {
    io.emit("sendMessage", {text: 'connected', id: Math.random(), type: 'server'})
    socket.on("message", (message)=>{
      socket.broadcast.emit("sendMessage", {...message, type: 'server'})
    })
  });

}