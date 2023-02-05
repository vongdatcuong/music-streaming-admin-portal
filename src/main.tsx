import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Routes from './client/_shared/constants/routes';
import Page404 from './client/404';
import App from './client/AppWrapper';
import Login from './client/Login';
import PermissionList from './client/PermissionList';
import SongList from './client/SongList';
import UserList from './client/UserList';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: Routes.SONG.SONGS,
        element: <SongList />,
      },
      {
        path: Routes.PERMISSION.PERMISSIONS,
        element: <PermissionList />,
      },
      {
        path: Routes.USER.USERS,
        element: <UserList />,
      },
      {
        path: Routes.AUTH.LOGIN,
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
