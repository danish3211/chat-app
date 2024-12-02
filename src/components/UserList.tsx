/* eslint-disable @typescript-eslint/no-unused-vars */
import { CiCirclePlus } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import User from "./User";
import { Dropdown, MenuProps, Space, Typography } from "antd";
import api from "../utlis/axios";
import CreateChatModal from "./modal/CreateChat";
import CreateGroupModal from "./modal/CreateGroup";
import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
interface UserData {
  _id: string;
  pic: string;
  name: string;
  email: string;
}

interface GroupData {
  _id: string;
  chatName: string;
}
const UserList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [users, setUsers] = useState<UserData[]>([]);
  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupChats, setGroupChats] = useState<GroupData[]>([]);
  const tabs = ["All", "Groups"];
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Create Chat",
      onClick: () => setIsCreateChatModalOpen(true),
    },
    {
      key: "2",
      label: "Create New Group",
      onClick: () => setIsCreateGroupModalOpen(true),
    },
  ];

  const getUsers = async () => {
    try {
      const response = await api.get("/user");
      setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupChats = async () => {
    try {
      const response = await api.get("/chat");
      setGroupChats(response.data);
      console.log("Group Chats Response:", response.data);
    } catch (error) {
      console.error("Error fetching group chats:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getGroupChats();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroupChats = groupChats.filter((chat) =>
    chat.chatName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateChatModalOk = () => {
    setIsCreateChatModalOpen(false);
  };

  const handleCreateChatModalCancel = () => {
    setIsCreateChatModalOpen(false);
  };

  const handleCreateGroupModalOk = () => {
    setIsCreateGroupModalOpen(false);
  };

  const handleCreateGroupModalCancel = () => {
    setIsCreateGroupModalOpen(false);
  };


const handleUserClick = (userId: string, name: string, pic: string) => {
  navigate(`/chat/${userId}`, { state: { title: name, pic } });
};

const handleGroupClick = (chatId: string, chatName: string) => {
  navigate(`/chat/${chatId}`, { state: { title: chatName, pic: "" } });
};


  return (
    <div className="bg-[#111B21] min-h-screen pt-3">
      <div className="flex justify-between items-center pb-4 px-5 ">
        <p className="text-3xl font-bold  text-white">Danish's Chats</p>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <CiCirclePlus className="text-white cursor-pointer" size={30} />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className="px-5">
        <div className="flex items-center  bg-gray-100 dark:bg-gray-800 rounded-md px-4 py-2 shadow-sm">
          <FaSearch className="text-gray-500 dark:text-gray-400 text-lg mr-2" />
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search"
            className="flex-grow bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex space-x-2 mt-3 rounded-lg px-5 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-full font-medium 
            ${
              activeTab === tab
                ? "bg-green-700 text-green-300"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }
          `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5 px-5 h-[526px] overflow-y-scroll">
        {activeTab === "Groups" ? (
          <ul>
            {filteredGroupChats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => handleGroupClick(chat._id, chat.chatName)}
                className="cursor-pointer"
              >
                <User
                  key={chat._id}
                  title={chat.chatName}
                  time={""}
                  message={""}
                  pic={""}
                />
              </div>
            ))}
          </ul>
        ) : (
          <>
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id, user.name, user.pic)}
                className="cursor-pointer"
              >
                <User
                  key={user._id}
                  title={user.name}
                  time={new Date().getMinutes()}
                  message={""}
                  pic={user.pic}
                />
              </div>
            ))}
            <ul>
              {filteredGroupChats.map((chat) => (
             <div
             key={chat._id}
             onClick={() => handleGroupClick(chat._id, chat.chatName)}
             className="cursor-pointer"
           >
             <User
               key={chat._id}
               title={chat.chatName}
               time={""}
               message={""}
               pic={""}
             />
           </div>
              ))}
            </ul>
          </>
        )}
      </div>

      <CreateChatModal
        visible={isCreateChatModalOpen}
        onOk={handleCreateChatModalOk}
        onCancel={handleCreateChatModalCancel}
      />

      <CreateGroupModal
        visible={isCreateGroupModalOpen}
        onOk={handleCreateGroupModalOk}
        onCancel={handleCreateGroupModalCancel}
      />
    </div>
  );
};

export default UserList;
