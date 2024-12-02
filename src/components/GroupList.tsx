import { Avatar, Typography } from "antd";
import { FaUser } from "react-icons/fa";
const { Text } = Typography;
const GroupList = ({ pic, title }: { pic: string, title:string }) => {
  return (
    <div className="flex space-x-4 px-3 py-2 rounded-md shadow-sm hover:bg-slate-600 transition border-b">
      <Avatar src={pic} className="" size="large" icon={!pic && <FaUser />} />
      <Text strong className="text-white">
        {title}
      </Text>
    </div>
  );
};

export default GroupList;


     {/* <p>Admin: {chat.groupAdmin.name}</p>
              <p>Created At: {new Date(chat.createdAt).toLocaleString()}</p>
              <p>Users:</p> */}
                {/* <ul>
                  {chat.users.map((user) => (
                    <li key={user._id}>
                      <img
                      src={user.pic}
                      alt={user.name}
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                      <span>{user.name}</span>
                    </li>
                  ))}
                </ul> */}