import React from 'react';
import { useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import lodash from 'lodash';

import { sideNavConfig } from './sideNavConfig';
import { getChildPageSelected, getDefaultKeys, renderSideNav } from './utils';

import styles from './styles.module.scss';

const { Sider } = Layout;

const SideNav: React.FC = () => {
  const location = useLocation();
  // TODO: Figure out why we need this `childPageSelectedKeys`
  const childPageSelectedKeys = React.useMemo(
    () => getChildPageSelected(location.pathname),
    [location]
  );

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [openKeys, setOpenKeys] = React.useState(
    sideNavConfig.map((config) => config.title)
  );

  React.useEffect(() => {
    const menuSelected = getDefaultKeys(sideNavConfig, location.pathname);
    setOpenKeys([...new Set(menuSelected[0].concat(openKeys))]);
    setSelectedKeys([...menuSelected[1], ...childPageSelectedKeys]);
  }, [location]);

  const handleOpenChange = (keys: React.Key[]) => {
    setOpenKeys(keys as string[]);
  };

  return (
    <Sider collapsed={false} className={styles.sider}>
      <Menu
        theme="light"
        mode="inline"
        className={styles.menu}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
      >
        {renderSideNav(sideNavConfig)}
      </Menu>
    </Sider>
  );
};

export default SideNav;
