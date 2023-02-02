import React from 'react';

import { Typography } from 'antd';

interface Props {
  value?: string | number;
}

const ViewOnlyInput = ({ value }: Props) => {
  return <Typography.Text>{value}</Typography.Text>;
};

export default React.forwardRef(ViewOnlyInput);
