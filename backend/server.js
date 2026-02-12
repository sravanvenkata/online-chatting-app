const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin:"*",
  credentials:true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/auth", require("./routes/auth"));

const authMiddleware = require("./middleware/auth");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", userId: req.userId });
});

app.use('/api/chat',require('./routes/chat'));

app.use("/api/message", require("./routes/message"));

app.use("/api/user", require("./routes/user"));

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET","POST"],
  },
});
app.set("io",io);

const jwt = require("jsonwebtoken");

io.on("connection", (socket) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    console.log("User connected:", socket.userId);
  } catch {
    socket.disconnect();
    return;
  }

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.userId} joined chat ${chatId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.userId);
  });
});



server.listen(5000, () => {
  console.log("Server running on port 5000");
});

