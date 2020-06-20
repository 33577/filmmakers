import React from 'react'
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';

export default function Dragger({handleSubmit}: {handleSubmit: (chatLog: string) => void}) {
  const props = {
    name: 'file',
    multiple: true,
    customRequest: () =>{},
    iconRender: () => <> </>,
    onChange(info: UploadChangeParam) {
      if (typeof info.file.originFileObj !== "undefined") { 
        const reader = new FileReader();
        reader.readAsText(info.file.originFileObj);
        reader.onload = function () {
          handleSubmit(reader.result as string);
        };
      }
    },
  };
  const { Dragger } = Upload;

  return (
    <Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">클릭하거나 채팅 로그 파일을 끌어다 놓으세요</p>
        <p className="ant-upload-hint">파일은 어느 곳에 전송되거나 저장되지 않습니다.</p>
    </Dragger>
  )
}
