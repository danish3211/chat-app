import { Avatar, Input, Typography } from "antd";
import { FaUser } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useLocation } from "react-router-dom";
const { Text } = Typography;
const ChatScreen = () => {
  const location = useLocation();
  const { title, pic } = location.state || { title: "Unknown", pic: "" };
  

  return (
    <div className="bg-[#0B141A] min-h-screen relative">
      <div className="h-16 bg-[#202C33] flex items-center px-4">
        <div className="flex items-center gap-3">
          <Avatar src={pic} className="" size="large" icon={<FaUser />} />
          <Text className="text-white text-lg">{title}</Text>
        </div>
      </div>
      <div className="bg-[#202C33] inset-x-0 bottom-0 absolute h-16 p-3 flex items-center gap-2">
        <Input
          className="bg-gray-400 h-11 hover:bg-gray-400 focus-within:bg-gray-400 placeholder:text-white"
          placeholder="Type a message"
        />
        <IoMdSend size={40} className="text-white" />
      </div>
    </div>
  );
};

export default ChatScreen;
