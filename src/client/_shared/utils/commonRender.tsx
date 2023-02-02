import React from 'react';

import { Space } from 'antd';
import { uniqueId } from 'lodash';
import moment from 'moment-timezone';

export const renderDate = (value: number | undefined) => {
  return value ? moment.unix(value).format('YYYY-MM-DD HH:mm Z') : '-';
};

export const renderListLineByLine = (values: React.ReactNode[]) => (
  <Space key={uniqueId()} direction="vertical" size="small">
    {values}
  </Space>
);
