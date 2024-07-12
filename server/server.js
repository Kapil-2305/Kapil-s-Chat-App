const app = require('./app');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path: "./config.env"});

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, "->>>", err.message);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, "->>>", err.message);
    server.close(() => {
        process.exit(1);
    });
});

const { Server } = require('socket.io');

const http = require('http');

const server = http.createServer(app);

const User = require("./models/user");
const FriendRequest = require("./models/friendRequest");
const OneToOneMessage = require("./models/OneToOneMessage");
const AudioCall = require("./models/audioCall");
const VideoCall = require("./models/videoCall");

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
})
.then(() => {
    console.log('DB connection successful');
})
.catch(err => {
    console.log(err);
});

// Listen for when the client connects via socket.io-client
io.on("connection", async (socket) => {
    console.log(JSON.stringify(socket.handshake.query));
    const user_id = socket.handshake.query["user_id"];
  
    console.log(`User connected ${socket.id}`);
  
    if (user_id != null && Boolean(user_id)) {
      try {
        User.findByIdAndUpdate(user_id, {
          socket_id: socket.id,
          status: "Online",
        });
      } catch (e) {
        console.log(e);
      }
    }
});

const port = process.env.PORT || 8000;

server.listen(3000, () => {
    console.log(`Server is listening on port ${port}`);
});