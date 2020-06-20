import "./App.css";
import React from 'react';
import Dragger from "./components/input/Dragger";
import ChattingSpeedChart from "./components/result/ChattingSpeedChart";
import { getChattingSpeed } from "./util";

function App() {
  const [chatLog, setChatLog] = React.useState("");
  const handleSubmit = (newChatLog: string) => {
    setChatLog(newChatLog);
  }
  const chattingSpeed = getChattingSpeed(chatLog);
  return (
    <div className="App">
      <Dragger handleSubmit={handleSubmit} />
      <ChattingSpeedChart chattingSpeed={chattingSpeed} />
    </div>
  );
}

export default App;
