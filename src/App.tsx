import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatScreen from "./components/ChatScreen";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="flex">
      <div className="w-[500px]">
        <UserList />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<div className="flex justify-center items-center min-h-screen bg-[#0B141A] text-white text-3xl font-bold">Select a user to chat</div>} />
          <Route path="/chat/:userId" element={<ChatScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
