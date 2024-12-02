import { Avatar, Typography } from "antd";
import { FaUser } from "react-icons/fa";

const { Text } = Typography;
const User = ({
  title,
  time,
  message,
  pic,
}: {
  title: string;
  time: string | number;
  message: string;
  pic: string;
}) => {
  return (
    <div className="flex items-center space-x-4 px-3 py-2 rounded-md shadow-sm hover:bg-slate-600 transition border-b">
      <Avatar src={pic} className="" size="large" icon={!pic && <FaUser />} />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <Text strong className="text-white">
            {title}
          </Text>
          <Text className="text-[#dbdcde]">{time}</Text>
        </div>
        <div className="flex items-center space-x-2">
          <Text className="text-white">{message}</Text>
        </div>
      </div>
    </div>
  );
};

export default User;
