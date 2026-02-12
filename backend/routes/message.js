const express = require('express');
const Message = require("../models/Message");
const Chat = require('../models/Chat');
const auth = require('../middleware/auth');

const router = express.Router();

router.post("/send", auth,async (req,res) =>{
    const {chatId, text} = req.body;
    const message = new Message({
        chatId,
        senderId: req.userId,
        text,
    });

    await message.save();

    await Chat.findByIdAndUpdate(chatId,{lastMessage:text,});

    const io = req.app.get("io");
    io.to(chatId).emit("new-message",message);

    res.status(201).json(message);
});

router.get("/:chatId", auth, async (req, res) => {
  const { chatId } = req.params;

  const messages = await Message.find({ chatId })
    .sort({ createdAt: 1 });

  res.json(messages);
});


module.exports = router;