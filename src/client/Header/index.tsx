import React from 'react';

import {
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Spin } from 'antd';

import { useUser } from '../_shared/hooks/useUser';
import { removeTokenUser } from '../_shared/utils/auth';
import { redirectToLoginPage } from '../_shared/utils/index';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useUser();

  const handleLogout = () => {
    removeTokenUser();
    redirectToLoginPage();
  };

  const userName = user?.firstName + ' ' + user?.lastName;
  const userAvatar = 'emptyForNow';

  const UserInfoWrapper = (
    <Menu>
      <Menu.Item className={styles.userInfoWrapper}>
        <Avatar className={styles.avatar} src={userAvatar}>
          {userName}
        </Avatar>
        <div>
          <div className={styles.username}>{userName}</div>
          <div className={styles.email}>{user?.email}</div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout}>
        <Button className={styles.logout} type="text" icon={<LogoutOutlined />}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={styles.headerPanel}>
      <div className={styles.logoContainer}>
        <span
          className={styles.collapse}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        <div className={styles.logo}>
          <RiseOutlined className={styles.icon} />
          Music Streaming Admin
        </div>
      </div>
      <div className={styles.rightContainer}>
        <Dropdown overlay={UserInfoWrapper} trigger={['click']}>
          <Avatar src={userAvatar} className={styles.user}>
            <Spin spinning={false} indicator={<LoadingOutlined />} />
            {userName}
          </Avatar>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;
