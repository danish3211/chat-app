import { Modal, Input, Button } from "antd";
import { useEffect, useState } from "react";
import api from "../../utlis/axios";

interface UserData {
  _id: string;
  pic: string;
  name: string;
  email: string;
}

interface CreateGroupModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectUsers, setSelectUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const getUsers = async () => {
    try {
      const response = await api.get("/user");
      setUsers(response.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUserClick = (userId: string) => {
    if (selectUsers.includes(userId)) {
      setSelectUsers(selectUsers.filter((id) => id !== userId));
    } else {
      setSelectUsers([...selectUsers, userId]);
    }
  };

  const handleCreateGroup = async () => {
    // if (!groupName) {
    //   alert("Please enter a group name");
    //   return;
    // }

    try {
      const response = await api.post("/chat/group", {
        name: groupName || undefined,
        users: JSON.stringify(selectUsers),
      });
      console.log(response);
      onOk();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalCancel = () => {
    setSelectUsers([]);
    onCancel();
  };

  return (
    <Modal
      title="Create New Group"
      visible={visible}
      footer={null}
      onCancel={handleModalCancel}
    >
      <Input
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search User"
      />
      {selectUsers.length > 0 && (
        <div className="mt-2">
          <Input
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      )}
      <div className="flex pt-2 gap-3">
        {users
          .filter((user) => selectUsers.includes(user._id))
          .map((user) => (
            <div
              key={user._id}
              className="bg-slate-400 w-fit px-2 py-1 text-white rounded-lg"
            >
              {user.name}
            </div>
          ))}
      </div>
      <div className="mt-5 h-[300px] overflow-y-scroll ">
        {loading ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-gray-600 mx-auto"></div>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user._id)}
              className={`flex p-2 cursor-pointer rounded-md mb-2 hover:bg-slate-600 transition  ${
                selectUsers.includes(user._id) ? "bg-slate-600" : ""
              }`}
            >
              <img
                src={user.pic}
                alt={user.name}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />
              <div>
                <div className="text-white flex items-end">{user.name}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleModalCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleCreateGroup}>
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;
