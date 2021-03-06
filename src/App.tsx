import "./App.css";
import React from "react";
import { Typography } from "antd";
import Dragger from "./components/input/Dragger";
import ChattingSpeedChart from "./components/result/ChattingSpeedChart";
import { getChattingSpeed } from "./util";
import Footer from "./components/Footer";
import MockChart from "./components/mock/MockChart";

function App() {
    const [chatLog, setChatLog] = React.useState("");
    const handleSubmit = (newChatLog: string) => {
        setChatLog(newChatLog);
    };
    const chattingSpeed = getChattingSpeed(chatLog);
    const keywordChattingSpeed = getChattingSpeed(chatLog, [
        "LAUGH",
        "YOUTUBE",
        "SURPRISE",
        "EXCLAMATION_MARK",
        "QUESTION_MARK",
    ]);
    const laughChattingSpeed = getChattingSpeed(chatLog, "LAUGH");
    const youtubeChattingSpeed = getChattingSpeed(chatLog, "YOUTUBE");
    const surpriseChattingSpeed = getChattingSpeed(chatLog, "SURPRISE");
    const exclamationMarkChattingSpeed = getChattingSpeed(chatLog, "EXCLAMATION_MARK");
    const questionMarkChattingSpeed = getChattingSpeed(chatLog, "QUESTION_MARK");

    const { Title } = Typography;

    return (
        <div className="App" style={{ padding: "10%" }}>
            <Title style={{ textAlign: "center" }}> For FILMMAKRES </Title>
            <p style={{ textAlign: "center", marginBottom: 40 }}>
                스트리머 영상의 채팅 로그를 분석해서, 영상 편집 전에 긴 영상을 확인하는 시간을 줄여줍니다.
            </p>
            <Dragger handleSubmit={handleSubmit} />
            <ChattingSpeedChart chattingSpeed={chattingSpeed} title="전체 채팅 수" />
            <ChattingSpeedChart chattingSpeed={keywordChattingSpeed} title="키워드별 채팅 수" />
            <ChattingSpeedChart chattingSpeed={laughChattingSpeed} title="ㅋㅋㅋㅋ" />
            <ChattingSpeedChart chattingSpeed={youtubeChattingSpeed} title="유튜브 언급" />
            <ChattingSpeedChart chattingSpeed={surpriseChattingSpeed} title="감탄" />
            <ChattingSpeedChart chattingSpeed={exclamationMarkChattingSpeed} title="느낌표" />
            <ChattingSpeedChart chattingSpeed={questionMarkChattingSpeed} title="물음표" />
            <Footer />
            {chatLog === "" ? <MockChart /> : null}
        </div>
    );
}

export default App;
