export default function notificationSocket(io, socket) {
  socket.on('notify:subscribe', ({ userId }) => {
    socket.join(`notify:${userId}`);
    console.log(`🔔 Subscribed to notifications for ${userId}`);
  });

  socket.on('notify:send', ({ userId, payload }) => {
    io.to(`notify:${userId}`).emit('notify:push', payload);
    console.log(`📢 Notification sent to ${userId}: ${payload.type}`);
  });
}
