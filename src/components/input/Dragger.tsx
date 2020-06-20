import React from 'react'
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default function Dragger({handleSubmit}: {handleSubmit: (chatLog: string) => void}) {
  const props = {
    name: 'file',
    multiple: true,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      var reader = new FileReader();
      reader.readAsText(info.file.originFileObj);
      reader.onload = function () {
        handleSubmit(reader.result as string);
      };
    },
  };
  const { Dragger } = Upload;

  return (
    <Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
        </p>
    </Dragger>
  )
}
