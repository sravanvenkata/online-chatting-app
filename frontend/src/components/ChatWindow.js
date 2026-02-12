import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import socket from "../services/socket";
import { getCurrentUser } from "../utils/auth";


function ChatWindow({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const [chatInfo, setChatInfo] = useState(null);


  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get(
        `/message/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(res.data);
    };

    fetchMessages();
  }, [chatId]);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);


  const sendMessage = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    const res = await api.post(
      "/message/send",
      { chatId, text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessages([...messages, res.data]);
    setText("");
  };
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
  if (!chatId) return;

  const fetchChat = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get(
      `/chat/${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setChatInfo(res.data);
  };

  fetchChat();
}, [chatId]);


  useEffect(() => {
    if (!chatId) return;

    socket.emit("join-chat", chatId);

    return () => {
      socket.off("new-message");
    };
  }, [chatId]);

  useEffect(() => {
    socket.on("new-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("new-message");
    };
  }, []);
  useEffect(() => {
  setText("");   // clear input when chat changes
}, [chatId]);


  if (!chatId) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }


 return (
  <div className="flex flex-col h-full">
<div className="h-14 border-b flex items-center px-4 font-semibold">
  {(() => {
  const myUser = getCurrentUser();
  const otherUser = chatInfo?.participants?.find(
    (p) => p._id.toString() !== myUser?.userId
  );

  return (<div className="h-14 border-b flex items-center px-6 shadow-sm">
  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-3">
    {otherUser?.username?.[0]?.toUpperCase()}
  </div>

  <div>
    <div className="font-semibold">
      {otherUser?.username}
    </div>
    <div className="text-xs text-gray-500">
      Online
    </div>
  </div>
</div>
);
})()}

</div>

  <div className="flex flex-col h-[80vh] border rounded-lg p-4">
    
    <div className="flex-1 overflow-y-auto space-y-2">
      {messages.map((msg) => {
        const myId = JSON.parse(
          atob(localStorage.getItem("token").split(".")[1])
        ).userId;

        const isMine = msg.senderId === myId;

        return (
          <div
            key={msg._id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
  className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow
    ${isMine
      ? "bg-blue-500 text-white rounded-br-none"
      : "bg-white text-gray-800 rounded-bl-none"}
  `}
>

  <div>{msg.text}</div>
  <div
    className={`text-[10px] mt-1 text-right
      ${isMine ? "text-blue-100" : "text-gray-500"}
    `}
  >
    {formatTime(msg.createdAt)}
  </div>
</div>

          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>

    {chatId && (
      <div className="flex gap-2 mt-3">
       <input
  value={text}
  onChange={(e) => setText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && text.trim()) {
      sendMessage();
    }
  }}
  placeholder="Type a message"
  className="flex-1 border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
/>

       <button
  onClick={sendMessage}
  disabled={!text.trim()}
  className={`px-4 py-2 rounded text-white
    ${text.trim()
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-blue-300 cursor-not-allowed"}
  `}
>
  Send
</button>

      </div>
    )}

  </div></div>
);

}

export default ChatWindow;
