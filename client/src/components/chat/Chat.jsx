import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { motion, AnimatePresence } from "framer-motion";

function Chat({ chats, openChatId }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [sending, setSending] = useState(false);

  const messageEndRef = useRef();
  const formRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  // Auto-open chat if redirected with openChatId
  useEffect(() => {
    if (openChatId && chats) {
      const targetChat = chats.find(c => c.id === openChatId);
      if (targetChat) {
        handleOpenChat(targetChat.id, targetChat.receiver);
      }
    }
  }, [openChatId, chats]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
      alert("Failed to open chat. Check console for details.");
    }
  };

  const handleDeleteChat = async (id) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;
    try {
      await apiRequest.delete("/chats/" + id);
      setChat(null);
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to delete chat!");
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await apiRequest.delete("/messages/" + msgId);
      setChat((prev) => ({
        ...prev,
        messages: prev.messages.filter((m) => m.id !== msgId),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    setSending(true);
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Trigger form submission manually
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <div className="messages-list">
          {chats?.map((c) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="message"
              key={c.id}
              style={{
                backgroundColor:
                  c.seenBy.includes(currentUser.id) || chat?.id === c.id
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(212, 175, 55, 0.1)",
                border: chat?.id === c.id ? "1px solid var(--primary)" : "1px solid transparent"
              }}
              onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
              <div className="content">
                <div className="name-row">
                  <span>{c.receiver.username}</span>
                  {/* Placeholder for online status, ideally driven by socket events */}
                  {/* <div className="online-dot"></div> */}
                </div>
                <p>{c.lastMessage}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="chat-area-wrapper">
        <AnimatePresence mode="wait">
          {chat ? (
            <motion.div
              className="chatBox"
              key="chat-box"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="top">
                <div className="user">
                  <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
                  {chat.receiver.username}
                </div>
                <span className="close" onClick={() => handleDeleteChat(chat.id)} style={{ marginRight: "10px", background: "#ff4444", color: "white" }}>
                  Delete
                </span>
                <span className="close" onClick={() => setChat(null)}>
                  ✕
                </span>
              </div>
              <div className="center">
                {chat.messages.map((message) => (
                  <div
                    className="chatMessage"
                    style={{
                      alignSelf:
                        message.userId === currentUser.id
                          ? "flex-end"
                          : "flex-start",
                      textAlign:
                        message.userId === currentUser.id ? "right" : "left",
                    }}
                    key={message.id}
                  >
                    <p className={message.userId === currentUser.id ? "own" : "other"}>
                      {message.text}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: message.userId === currentUser.id ? 'flex-end' : 'flex-start' }}>
                      <span>{format(message.createdAt)}</span>
                      {message.userId === currentUser.id && (
                        <span
                          onClick={() => handleDeleteMessage(message.id)}
                          style={{ cursor: 'pointer', color: '#ff4444', fontSize: '10px' }}
                        >
                          delete
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messageEndRef}></div>
              </div>
              <form onSubmit={handleSubmit} className="bottom" ref={formRef}>
                <textarea
                  name="text"
                  placeholder="Type a message..."
                  onKeyDown={handleKeyDown}
                ></textarea>
                <button disabled={sending}>
                  {sending ? "..." : "Send"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="no-chat-selected"
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src="/chat.png" alt="" className="chat-icon" />
              <h3>Select a conversation</h3>
              <p>Choose a user from the left to start chatting.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Chat;
