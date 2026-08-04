import 'dotenv/config';
import { connectToDatabase } from './config/db.js';
import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (ticketId) => {
    console.log(`User ${socket.id} joined room ${ticketId}`);
    socket.join(ticketId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
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
