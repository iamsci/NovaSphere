export default function chatSocket(io, socket) {
  socket.on('chat:join', ({ roomId, user }) => {
    socket.join(roomId);
    socket.to(roomId).emit('chat:joined', { user });
    console.log(`💬 ${user} joined room ${roomId}`);
  });

  socket.on('chat:message', ({ roomId, message }) => {
    io.to(roomId).emit('chat:message', { message });
    console.log(`📨 Message in ${roomId}: ${message.text}`);
  });

  socket.on('chat:leave', ({ roomId, user }) => {
    socket.leave(roomId);
    socket.to(roomId).emit('chat:left', { user });
    console.log(`👋 ${user} left room ${roomId}`);
  });
}
