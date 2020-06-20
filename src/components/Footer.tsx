import React from 'react';
import { Typography, Divider } from 'antd';

export function Footer() {
    const { Title, Text } = Typography;

    return (
        <div style={{marginTop: 60}}>
            <Divider />
            <Typography>
                <Title level={3}>사용 방법</Title>
                <Title level={4}> 1. Chatty 설치 및 채팅방 입장 <a href="https://m.blog.naver.com/baolab/221438526254">(참고)</a> </Title>
                <Title level={4}> 2. 생성된 채팅 로그 파일을 위 박스에 붙여넣기 </Title>
                <Text> Chatty 상단 메뉴 중 메인 {'>'} 설정 {'>'} 채팅 {'>'} 로그 저장 탭, 하단에서 저장 폴더 확인 가능 </Text>
                <Title level={4}> 3. 문의, 기능 개선, 추가 요청: halvlin.lee@gmail.com </Title>
            </Typography>
        </div>
    )
}
