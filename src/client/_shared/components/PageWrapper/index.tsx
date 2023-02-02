import * as React from 'react';

import { Layout } from 'antd';
import cx from 'classnames';

import styles from './s.module.scss';

interface PageWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ className, children }) => {
  return (
    <Layout.Content className={cx(styles.page, className)}>
      {children}
    </Layout.Content>
  );
};

export default PageWrapper;
