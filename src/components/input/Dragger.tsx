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
        <p className="ant-upload-text">클릭하거나 파일을 끌어다 놓으세요</p>
        <p className="ant-upload-hint">.log 형식</p>
    </Dragger>
  )
}
