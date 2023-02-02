import React from 'react';

import {
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Spin } from 'antd';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    username: 'cuong.vongdat',
    email: 'cuong.vd@gmail.com',
    picture: 'cuong.vd',
  });

  const handleLogout = () => {
    console.log('log out');
  };

  const UserInfoWrapper = (
    <Menu>
      <Menu.Item className={styles.userInfoWrapper}>
        <Avatar className={styles.avatar} src={userInfo.picture}>
          {userInfo.username}
        </Avatar>
        <div>
          <div className={styles.username}>{userInfo.username}</div>
          <div className={styles.email}>{userInfo.email}</div>
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
          <Avatar src={userInfo.picture} className={styles.user}>
            <Spin spinning={false} indicator={<LoadingOutlined />} />
            {userInfo.username}
          </Avatar>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;
