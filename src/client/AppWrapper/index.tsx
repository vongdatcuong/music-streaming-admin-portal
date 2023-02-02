import React from 'react';

import { Layout } from 'antd';

import Header from '../Header';
import SideNav from '../SideNav';

import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout>
        <SideNav />
        <Content>{<Outlet />}</Content>
      </Layout>
    </Layout>
  );
};

export default App;
