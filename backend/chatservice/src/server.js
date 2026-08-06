import 'dotenv/config';
import { connectToDatabase } from './config/db.js';
import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';
import { verifyToken } from './middlewares/auth.middleware.js';
import { createMessage } from './services/chat.service.js';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token||
    socket.handshake.query?.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

   socket.user= verifyToken(token); // Implement your token verification logic here
  // Here you can add your token verification logic
  next();
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.user.userId);

  socket.on('join-chat', (chatId) => {
    socket.join(chatId);
    socket.emit('joined-chat', chatId);
    console.log(`User ${socket.user.userId} joined chat ${chatId}`);
  });

  socket.on('leave-chat', (chatId) => {
    socket.leave(chatId);
    console.log(`User ${socket.user.userId} left chat ${chatId}`);
  });

  socket.on('send-message', (payload) => {
    console.log(`User ${socket.user.userId} sent message to chat ${payload.chatId}:`, payload.message);
    try{
      const message = createMessage(payload.chatId, socket.user.userId, socket.user.role, payload.message);
      io.to(payload.chatId).emit('receive-message', message);
    }catch(err){
      console.error('Error creating message:', err);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('typing', (payload) => {
    console.log(`User ${socket.user.userId} is typing in chat ${payload.chatId}`);
    socket.to(payload.chatId).emit('typing', { userId: socket.user.userId });
  });

  socket.on('stop-typing', (payload) => {
    console.log(`User ${socket.user.userId} stopped typing in chat ${payload.chatId}`);
    socket.to(payload.chatId).emit('stop-typing', { userId: socket.user.userId });
  });

  socket.on("read-message", (payload) => {
    console.log(`User ${socket.user.userId} read message in chat ${payload.chatId}:`, payload.messageId);
    // Here you can implement logic to mark the message as read in your database
    io.to(payload.chatId).emit('message-read', { messageId: payload.messageId, userId: socket.user.userId });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.user.userId);
  });
});

const startserver = async () => {
  const port = process.env.PORT || 8083;

  try {
    await connectToDatabase();
    console.log('Database connected successfully!');
  } catch (err) {
    console.log('Error in Connecting DB', err);
  }

  server.listen(port, () => {
    console.log(`Chat Service is up on port ${port}!!`);
  });
};

startserver();
