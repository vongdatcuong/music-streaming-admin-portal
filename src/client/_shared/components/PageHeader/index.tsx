import React from 'react';

import { Typography } from 'antd';
import cx from 'classnames';
import styles from './s.module.scss';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<any> = (props) => {
  const title =
    typeof props.title === 'string' ? (
      <h3 className={styles.pageTitle}>{props.title}</h3>
    ) : (
      props.title
    );
  return (
    <Typography.Text className={cx(styles.pageHeader, props.classNames)}>
      {title}
    </Typography.Text>
  );
};

export default PageHeader;
