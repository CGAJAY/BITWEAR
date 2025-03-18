import { configDotenv } from 'dotenv';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import app from './app';
import connectDB from './db/connectDB';

configDotenv(); // Load .env file

const PORT = process.env.PORT || 3000; 

// Create HTTP server with Express app
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, 
  },
});

// Socket.IO connection handling
// io.on('connection', (socket: Socket) => {
//   console.log('A user connected:', socket.id);

//   // Message back to the client
//   socket.on('message', (msg: string) => {
//     console.log('Message received:', msg);
//     socket.emit('message', `Server says: ${msg}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// Connect to MongoDB
connectDB()

// Start server
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

  