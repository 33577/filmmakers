import "./App.css";
import React from 'react';
import Dragger from "./components/input/Dragger";
import ChattingSpeedChart from "./components/result/ChattingSpeedChart";
import { getChattingSpeed } from "./util";
import { Footer } from "./components/Footer";
import { Typography, Divider } from 'antd';
import { MockChart } from "./components/mock/MockChart";

function App() {
  const [chatLog, setChatLog] = React.useState("");
  const handleSubmit = (newChatLog: string) => {
    setChatLog(newChatLog);
  }
  const chattingSpeed = getChattingSpeed(chatLog);
  const laughChattingSpeed = getChattingSpeed(chatLog, "LAUGH");
  const youtubeChattingSpeed = getChattingSpeed(chatLog, "YOUTUBE");
  const questionMarkChattingSpeed = getChattingSpeed(chatLog, "QUESTION_MARK");

  const { Title } = Typography;

  return (
    <div className="App" style={{padding: "10%"}}>
      <Title style={{textAlign: "center"}}> 채팅 로그 통계 </Title>
      <Dragger handleSubmit={handleSubmit} />
      <Divider />
      {chatLog === "" ? <MockChart /> : null}
      <ChattingSpeedChart chattingSpeed={chattingSpeed} title="전체 채팅 수" />
      <ChattingSpeedChart chattingSpeed={laughChattingSpeed} title="ㅋㅋㅋ..." />
      <ChattingSpeedChart chattingSpeed={youtubeChattingSpeed} title="유튜브 언급" />
      <ChattingSpeedChart chattingSpeed={questionMarkChattingSpeed} title="물음표" />
      <Footer />
    </div>
  );
}

export default App;
