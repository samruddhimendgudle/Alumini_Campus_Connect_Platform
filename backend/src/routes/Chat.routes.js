const express = require("express");
const router = express.Router();
const { 
  getConversation,
  getConversations,
  sendMessage,
  getAlumniForChat,
  getUnreadCount
} = require("../controllers/chat.controller");
const auth = require("../middlewares/auth.middleware");

// Get all conversations
router.get("/conversations", auth, getConversations);

// Get unread count
router.get("/unread-count", auth, getUnreadCount);

// Get alumni for chat
router.get("/alumni", auth, getAlumniForChat);

// Get conversation with specific user
router.get("/:recipientId", auth, getConversation);

// Send message
router.post("/send", auth, sendMessage);

module.exports = router;