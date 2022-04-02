import { Server } from "socket.io";


export function setupHandlers(io: Server) {
  io.on("connection", (socket) => {
    let activeRoom ="General"
    socket.join(activeRoom)
    io.emit("sendMessage", {text: 'connected', id: Math.random(), type: 'server'})
    socket.on("message", (message)=>{
      socket.to(activeRoom).emit("sendMessage", {...message, type: 'server'})
    });
    //socket.to("some room").emit("some event")
    socket.on('join', function (room: any) {
      socket.join(room);
      activeRoom = room;
    });
    socket.on('leave', function (room: any) {
      socket.leave(room);
     });

  });

}