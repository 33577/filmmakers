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
  const laughChattingSpeed = getChattingSpeed(chatLog, "LAUGH");
  const youtubeChattingSpeed = getChattingSpeed(chatLog, "YOUTUBE");
  const questionMarkChattingSpeed = getChattingSpeed(chatLog, "QUESTION_MARK");
  return (
    <div className="App">
      <div style={{padding: "10%"}}>
        <Dragger handleSubmit={handleSubmit} />
        <ChattingSpeedChart chattingSpeed={chattingSpeed} title="전체" />
        <ChattingSpeedChart chattingSpeed={laughChattingSpeed} title="ㅋㅋㅋ..." />
        <ChattingSpeedChart chattingSpeed={youtubeChattingSpeed} title="유튜브 언급" />
        <ChattingSpeedChart chattingSpeed={questionMarkChattingSpeed} title="물음표" />
      </div>
    </div>
  );
}

export default App;
