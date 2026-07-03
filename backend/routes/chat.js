const express = require('express');
const Chat = require('../models/Chat');
const auth = require('../middleware/auth');
const mongoose = require("mongoose");

const router = express.Router();



router.post('/create', auth, async (req,res) =>{
    try {
        const { userId } = req.body;
        const myId = req.userId;

        const myObjectId = new mongoose.Types.ObjectId(myId);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        let chat = await Chat.findOne({
            participants: { $all: [myObjectId, userObjectId] }
        });

        if (!chat) {
            chat = new Chat({
                participants: [myObjectId, userObjectId],
            });

            await chat.save();
        }

        res.json(chat);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/",auth,async(req,res)=>{
    const myId = req.userId;
    const chats = await Chat.find({
        participants: myId,
    }).populate("participants", "username");
    res.json(chats);
});

router.get("/:id", auth, async (req, res) => {
    const chat = await Chat.findOne({
        _id: req.params.id,
        participants: req.userId,
    }).populate("participants", "username");

    if (!chat) {
        return res.status(403).json({ message: "Not allowed to view this chat" });
    }

  res.json(chat);
});


module.exports = router;