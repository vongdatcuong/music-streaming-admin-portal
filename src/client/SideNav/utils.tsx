import React from 'react';
import { matchPath } from 'react-router';
import { NavLink } from 'react-router-dom';

import { FolderOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { FolderConfig, LinkConfig, SideNavConfig } from './types';

import styles from './styles.module.scss';

const { SubMenu } = Menu;

export const renderSideNav = (sideNavConfig: SideNavConfig) => {
  return sideNavConfig.map((config: FolderConfig | LinkConfig) => {
    if (config.type === 'folder') {
      return (
        <SubMenu
          key={config.title}
          title={
            <span>
              <>
                {config.icon ? config.icon : <FolderOutlined />}
                <span>{config.title}</span>
              </>
            </span>
          }
        >
          {renderSideNav(config.items)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={config.routeId}>
        <NavLink
          className={styles.link}
          to={config.routeId}
          title={config.title}
        >
          <>
            {!!config.icon && config.icon}
            <span>{config.title}</span>
          </>
        </NavLink>
      </Menu.Item>
    );
  });
};

export const isFolderOpen = (
  folderConfig: FolderConfig,
  pathname: string
): boolean => {
  for (const item of folderConfig.items) {
    if (item.type === 'link') {
      if (
        matchPath(
          {
            path: item.routeId,
            end: true,
          },
          pathname
        )
      ) {
        return true;
      }
    } else if (item.type === 'folder') {
      if (isFolderOpen(item, pathname)) {
        return true;
      }
    }
  }

  return false;
};

export const getDefaultKeys = (
  sideNavConfig: SideNavConfig,
  pathname: string
) => {
  const openFolders: string[] = [];
  const selectedKeys: string[] = [];

  sideNavConfig.forEach((config) => {
    if (config.type === 'folder') {
      const [newOpenFolders, newSelectedKeys] = getDefaultKeys(
        config.items,
        pathname
      );
      openFolders.push(...newOpenFolders);
      selectedKeys.push(...newSelectedKeys);
      if (isFolderOpen(config, pathname)) {
        openFolders.push(config.title);
      }
    }

    if (config.type === 'link') {
      if (
        matchPath(
          {
            path: config.routeId,
            end: true,
          },
          pathname
        )
      ) {
        selectedKeys.push(config.routeId);
      }
    }
  });

  return [openFolders, selectedKeys];
};

export const getChildPageSelected = (pathname: string) => {
  const splitedPath = pathname.split('/');
  const splitedLength = splitedPath.length;

  return Array.from({ length: splitedLength }, (_, i) =>
    splitedPath.slice(0, i).join('/')
  );
};
