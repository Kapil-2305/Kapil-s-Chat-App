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
        } 
        catch (e) {
            console.log(e);
        }
    }

    socket.on("friend_request", async (data) => {
        const to = await User.findById(data.to).select("socket_id");
        const from = await User.findById(data.from).select("socket_id");

        // create a friend request
        await FriendRequest.create({
            sender: data.from,
            recipient: data.to,
        });
        // emit event request received to recipient
        io.to(to?.socket_id).emit("new_friend_request", {
            message: "New friend request received",
        });
        io.to(from?.socket_id).emit("request_sent", {
            message: "Request Sent successfully!",
        });
    })

    socket.on("accept_request", async (data) => {
        // accept friend request => add ref of each other in friends array
        console.log(data);
        const request_doc = await FriendRequest.findById(data.request_id);
    
        console.log(request_doc);
    
        const sender = await User.findById(request_doc.sender);
        const receiver = await User.findById(request_doc.recipient);
    
        sender.friends.push(request_doc.recipient);
        receiver.friends.push(request_doc.sender);
    
        await receiver.save({ new: true, validateModifiedOnly: true });
        await sender.save({ new: true, validateModifiedOnly: true });
    
        await FriendRequest.findByIdAndDelete(data.request_id);
    
        // delete this request doc
        // emit event to both of them
    
        // emit event request accepted to both
        io.to(sender?.socket_id).emit("request_accepted", {
            message: "Friend Request Accepted",
        });
        io.to(receiver?.socket_id).emit("request_accepted", {
            message: "Friend Request Accepted",
        });
    });

    socket.on("end", function(){
        console.log("Call ended");
        socket.disconnect();
    })
});

const port = process.env.PORT || 8000;

server.listen(3000, () => {
    console.log(`Server is listening on port ${port}`);
});