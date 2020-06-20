import React from 'react';
import ChattingSpeedChart from "../result/ChattingSpeedChart";
import { getChattingSpeed } from "../../util";
import { Typography } from 'antd';
import { MOCK_CHAT_LOG } from "./mock";

export function MockChart() {
  const chattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "ALL", 2000);
  const laughChattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "LAUGH", 2000);
  const youtubeChattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "YOUTUBE", 2000);
  const questionMarkChattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "QUESTION_MARK", 2000);
  const { Title } = Typography;

  return (
    <div>
      <Title level={2} style={{textAlign: "center"}}> 결과 예시 </Title>
      <ChattingSpeedChart chattingSpeed={chattingSpeed} title="전체 채팅 수" />
      <ChattingSpeedChart chattingSpeed={laughChattingSpeed} title="ㅋㅋㅋ..." />
      <ChattingSpeedChart chattingSpeed={youtubeChattingSpeed} title="유튜브 언급" />
      <ChattingSpeedChart chattingSpeed={questionMarkChattingSpeed} title="물음표" />
    </div>
  );
}

