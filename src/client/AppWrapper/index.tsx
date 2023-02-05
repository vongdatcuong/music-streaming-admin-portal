import React from 'react';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import {
  PathsWithoutAuthentication,
  PathsWithoutSideNav,
} from '../_shared/constants/routes';
import { useUser } from '../_shared/hooks/useUser';
import { redirectToLoginPage } from '../_shared/utils/index';
import Header from '../Header';
import SideNav from '../SideNav';

import styles from './styles.module.scss';

const { Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const { user } = useUser();

  if (!user && !PathsWithoutAuthentication.includes(location.pathname)) {
    redirectToLoginPage();
  }

  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout>
        {!PathsWithoutSideNav.includes(location.pathname) && <SideNav />}
        <Content>{<Outlet />}</Content>
      </Layout>
    </Layout>
  );
};

export default App;
