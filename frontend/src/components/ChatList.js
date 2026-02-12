import { useEffect,useState } from "react";
import api from "../services/api";
import { getCurrentUser } from "../utils/auth";


function ChatList({onSelectChat,selectedChat}) {
    const [chats,setChats] = useState([]);
    const [search, setSearch] = useState("");
const [results, setResults] = useState([]);
const myUser = getCurrentUser();


const startChat = async (userId) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/chat/create",
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  await fetchChats();
  onSelectChat(res.data._id);
  setSearch("");
  setResults([]);
};

useEffect(() => {
  const fetchUsers = async () => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const token = localStorage.getItem("token");

    const res = await api.get(
      `/user/search?q=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setResults(res.data);
  };

  fetchUsers();
}, [search]);

        const fetchChats = async ()=>{
            const token = localStorage.getItem("token");
            const res = await api.get(
                "/chat",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setChats(res.data);
        };
        useEffect(() => {
  fetchChats();
},[]);


    return (
     <div className="flex flex-col h-full">

        <div className="p-3 border-b">
  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search users"
    className="w-full border rounded px-3 py-2 text-sm"
  />
  {results.length > 0 && (
  <div className="border-b">
    {results.map((user) => (
      <div
        key={user._id}
        onClick={() => startChat(user._id)}
        className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
      >
        {user.username}
      </div>
    ))}
  </div>
)}

</div>

  <div className="h-full flex flex-col">
    <div className="p-4 border-b font-semibold text-lg">
      Chats
    </div>

    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => {
        const otherUser = chat.participants.find((p) => p._id.toString()!== myUser.userId);

        return(<div
          key={chat._id}
          onClick={() => onSelectChat(chat._id)}
          className={`p-3 cursor-pointer hover:bg-gray-100
            ${selectedChat === chat._id
  ? "bg-blue-50 border-r-4 border-blue-500"
  : "hover:bg-gray-100"}

          `}
        >
          <div className="flex items-center gap-3">
  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
    {otherUser?.username?.[0]?.toUpperCase()}
  </div>

  <div className="flex-1">
    <div className="font-medium text-sm">
      {otherUser?.username}
    </div>
    <div className="text-xs text-gray-500 truncate">
      {chat.lastMessage || "No messages yet"}
    </div>
  </div>
</div>

        </div>)
})}
    </div>
  </div>
  </div>
);

}

export default ChatList;