import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import Auth from "./components/auth/Auth";
import socket from "./services/socket"
import { useState, useEffect } from "react";
import { getCurrentUser } from "./utils/auth";


function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const user = getCurrentUser();

  useEffect(() => {
  socket.connect();

  return () => {
    socket.disconnect();
  };
}, []);

  if (!isLoggedIn) {
    return <Auth onAuth={() => setIsLoggedIn(true)} />;
  }


  return (
  <div className="h-screen flex flex-col bg-gray-100">
    
    {/* Top bar */}
    <div className="h-12 bg-white border-b flex items-center justify-between px-6">
      <div className="font-semibold text-lg">
        {user.username}
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="text-sm text-red-500 hover:underline"
      >
        Logout
      </button>
    </div>

    {/* Main content */}
    <div className="flex flex-1 overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        <ChatList
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        <ChatWindow chatId={selectedChat} />
      </div>

    </div>
  </div>
);

}

export default App;
