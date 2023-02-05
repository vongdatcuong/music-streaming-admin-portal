import { AUTH } from './auth';
import { PERMISSION } from './permission';
import { SONG } from './song';
import { USER } from './user';

export const Routes = {
  SONG,
  PERMISSION,
  USER,
  AUTH,
  HOME: '/',
};

export const PathsWithoutSideNav = [AUTH.LOGIN];
export const PathsWithoutAuthentication = [AUTH.LOGIN];

export default Routes;
