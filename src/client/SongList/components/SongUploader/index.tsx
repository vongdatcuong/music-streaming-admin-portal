import React from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile } from 'antd';

interface Props {
  value?: UploadFile;
  onChange?: (file?: UploadFile) => void;
}

const SongUploader = ({ value, onChange }: Props) => {
  const handleBeforeUpload = (file: UploadFile) => {
    onChange?.(file);
    return false;
  };
  const handleRemove = () => {
    onChange?.(undefined);
  };

  return (
    <Upload
      maxCount={1}
      fileList={value ? [value] : undefined}
      beforeUpload={handleBeforeUpload}
      onRemove={handleRemove}
      accept="audio/*"
    >
      <Button icon={<UploadOutlined />}>Upload audio</Button>
    </Upload>
  );
};

export default React.forwardRef(SongUploader);
