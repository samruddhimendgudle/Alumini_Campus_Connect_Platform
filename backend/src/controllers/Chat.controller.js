const ChatMessage = require("../models/ChatMessage.model");
const User = require("../models/user.model");

// Get conversation between two users
exports.getConversation = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const userId = req.user.id;

    const messages = await ChatMessage.find({
      $or: [
        { senderId: userId, recipientId },
        { senderId: recipientId, recipientId: userId }
      ]
    })
      .populate("senderId", "name role")
      .populate("recipientId", "name role")
      .sort({ createdAt: 1 });

    // Mark messages as read
    await ChatMessage.updateMany(
      { senderId: recipientId, recipientId: userId, isRead: false },
      { isRead: true }
    );

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching conversation", error: err.message });
  }
};

// Get all conversations (list of people user has chatted with)
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await ChatMessage.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { recipientId: userId }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$recipientId",
              "$senderId"
            ]
          },
          lastMessage: { $first: "$message" },
          lastMessageTime: { $first: "$createdAt" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $ne: ["$senderId", userId] },
                  { $eq: ["$isRead", false] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      { $sort: { lastMessageTime: -1 } }
    ]);

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching conversations", error: err.message });
  }
};

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, message, messageType, doubtCategory, meetingProposedDate } = req.body;
    const senderId = req.user.id;

    const newMessage = new ChatMessage({
      senderId,
      recipientId,
      message,
      messageType: messageType || "text",
      doubtCategory,
      meetingProposedDate
    });

    await newMessage.save();
    await newMessage.populate("senderId", "name role");
    await newMessage.populate("recipientId", "name role");

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err.message });
  }
};

// Get alumni list for chat (for students)
exports.getAlumniForChat = async (req, res) => {
  try {
    const alumni = await User.find({ role: "alumni", verified: true })
      .select("name company jobRole email");
    
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: "Error fetching alumni", error: err.message });
  }
};

// Get unread count
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const unreadCount = await ChatMessage.countDocuments({
      recipientId: userId,
      isRead: false
    });

    res.json({ unreadCount });
  } catch (err) {
    res.status(500).json({ message: "Error fetching unread count", error: err.message });
  }
};