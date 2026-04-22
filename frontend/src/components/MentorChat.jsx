import { useEffect, useState } from "react";
import axios from "axios";

export default function MentorChat() {
  const [alumni, setAlumni] = useState([]);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [messageType, setMessageType] = useState("text"); // text, doubt, meeting_request
  const [doubtCategory, setDoubtCategory] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [showMeetingSchedule, setShowMeetingSchedule] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const doubtCategories = [
    "DSA & Coding",
    "System Design",
    "Interview Preparation",
    "Career Advice",
    "Technical Skills",
    "Other"
  ];

  // Fetch alumni for chat
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/chat/alumni",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setAlumni(res.data);
      } catch (err) {
        console.error("Error fetching alumni:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [token]);

  // Fetch conversation when alumni is selected
  useEffect(() => {
    if (!selectedAlumnus) return;

    const fetchConversation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chat/${selectedAlumnus._id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching conversation:", err);
        setMessages([]);
      }
    };

    fetchConversation();
  }, [selectedAlumnus, token]);

  // Send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedAlumnus) return;

    try {
      const payload = {
        recipientId: selectedAlumnus._id,
        message: inputMessage,
        messageType: messageType,
        doubtCategory: messageType === "doubt" ? doubtCategory : undefined,
        meetingProposedDate: messageType === "meeting_request" ? new Date(meetingDate) : undefined
      };

      const res = await axios.post(
        "http://localhost:5000/api/chat/send",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessages([...messages, res.data]);
      setInputMessage("");
      setMessageType("text");
      setDoubtCategory("");
      setMeetingDate("");
      setShowMeetingSchedule(false);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message");
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading mentors...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="flex h-[calc(100vh-150px)] gap-6">
        {/* Alumni List Sidebar */}
        <div className="w-80 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">
            🗣️ Mentors Available
          </h2>

          {alumni.length === 0 ? (
            <p className="text-gray-500">No mentors available</p>
          ) : (
            <div className="space-y-3">
              {alumni.map((alum) => (
                <div
                  key={alum._id}
                  onClick={() => setSelectedAlumnus(alum)}
                  className={`p-4 rounded-xl cursor-pointer transition ${
                    selectedAlumnus?._id === alum._id
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold">{alum.name}</h3>
                  <p className="text-sm opacity-75">{alum.company}</p>
                  <p className="text-xs opacity-60">{alum.jobRole}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Area */}
        {selectedAlumnus ? (
          <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">{selectedAlumnus.name}</h2>
              <p className="text-indigo-100">
                {selectedAlumnus.jobRole} at {selectedAlumnus.company}
              </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p className="text-center">
                    No messages yet. Start a conversation! 💬
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.senderId._id === currentUser.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-4 rounded-xl ${
                        msg.senderId._id === currentUser.id
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      {msg.messageType === "doubt" && (
                        <p className="text-xs mt-2 opacity-75">
                          Category: {msg.doubtCategory}
                        </p>
                      )}
                      {msg.messageType === "meeting_request" && (
                        <p className="text-xs mt-2 opacity-75">
                          Meeting requested for:{" "}
                          {new Date(msg.meetingProposedDate).toLocaleString()}
                        </p>
                      )}
                      <p className="text-xs mt-1 opacity-60">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input Area */}
            <div className="border-t p-6 bg-gray-50">
              {/* Message Type Selector */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => {
                    setMessageType("text");
                    setShowMeetingSchedule(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    messageType === "text"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => {
                    setMessageType("doubt");
                    setShowMeetingSchedule(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    messageType === "doubt"
                      ? "bg-yellow-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  ❓ Ask Doubt
                </button>
                <button
                  onClick={() => {
                    setMessageType("meeting_request");
                    setShowMeetingSchedule(true);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    messageType === "meeting_request"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  📅 Schedule Meeting
                </button>
              </div>

              {/* Doubt Category Selector */}
              {messageType === "doubt" && (
                <div className="mb-4">
                  <select
                    value={doubtCategory}
                    onChange={(e) => setDoubtCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Select doubt category</option>
                    {doubtCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Meeting Date Selector */}
              {messageType === "meeting_request" && (
                <div className="mb-4">
                  <input
                    type="datetime-local"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  />
                </div>
              )}

              {/* Input Box */}
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={
                    messageType === "doubt"
                      ? "Ask your doubt here..."
                      : messageType === "meeting_request"
                      ? "Add any notes for the meeting..."
                      : "Type your message..."
                  }
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              Select a mentor to start chatting 👈
            </p>
          </div>
        )}
      </div>
    </div>
  );
}