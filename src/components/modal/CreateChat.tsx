import { Modal, Input } from "antd";

interface CreateChatModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Create Chat"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>Create a new chat.</p>
      <Input placeholder="Enter chat name..." />
    </Modal>
  );
};

export default CreateChatModal;
