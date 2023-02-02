import { FileTextOutlined, HomeOutlined } from '@ant-design/icons';

import Routes from 'src/client/_shared/constants/routes';

import { SideNavConfig } from './types';

export const sideNavConfig: SideNavConfig = [
  {
    title: 'Home',
    icon: <HomeOutlined />,
    routeId: '/',
    type: 'link',
  },
  {
    title: 'Songs',
    type: 'folder',
    icon: <FileTextOutlined />,
    items: [
      {
        title: 'Songs',
        routeId: Routes.SONG.SONGS,
        type: 'link',
      },
    ],
  },
  {
    title: 'Permissions',
    type: 'folder',
    icon: <FileTextOutlined />,
    items: [
      {
        title: 'Permissions',
        routeId: Routes.PERMISSION.PERMISSIONS,
        type: 'link',
      },
    ],
  },
  {
    title: 'Users',
    type: 'folder',
    icon: <FileTextOutlined />,
    items: [
      {
        title: 'Users',
        routeId: Routes.USER.USERS,
        type: 'link',
      },
    ],
  },
];
