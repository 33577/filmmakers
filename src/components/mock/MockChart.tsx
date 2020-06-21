import React from 'react';
import ChattingSpeedChart from "../result/ChattingSpeedChart";
import { getChattingSpeed } from "../../util";
import { Typography } from 'antd';
import { MOCK_CHAT_LOG } from "./mock";

export function MockChart() {
  const chattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "ALL", 2000);
  const keywordChattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, ["LAUGH", "YOUTUBE", "SURPRISE", "EXCLAMATION_MARK", "QUESTION_MARK"], 2000);
  const laughChattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "LAUGH", 2000);
  const youtubeChattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "YOUTUBE", 2000);
  const surpriseChattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "SURPRISE", 2000);
  const questionMarkChattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "QUESTION_MARK", 2000);  
  const exclamationMarkChattingSpeed = getChattingSpeed(MOCK_CHAT_LOG, "EXCLAMATION_MARK", 2000);

  const { Title } = Typography;

  return (
    <div style={{paddingTop: 40}}>
      <Title level={2} style={{textAlign: "center"}}> 결과 예시 </Title>
      <ChattingSpeedChart chattingSpeed={chattingSpeed} title="전체 채팅 수" />
      <ChattingSpeedChart chattingSpeed={keywordChattingSpeed} title="키워드별 채팅 수" />
      <ChattingSpeedChart chattingSpeed={laughChattingSpeed} title="ㅋㅋㅋㅋ" />
      <ChattingSpeedChart chattingSpeed={youtubeChattingSpeed} title="유튜브 언급" />
      <ChattingSpeedChart chattingSpeed={surpriseChattingSpeed} title="감탄" />
      <ChattingSpeedChart chattingSpeed={exclamationMarkChattingSpeed} title="느낌표" />
      <ChattingSpeedChart chattingSpeed={questionMarkChattingSpeed} title="물음표" />
    </div>
  );
}
