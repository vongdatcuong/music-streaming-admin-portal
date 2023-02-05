import { readConfig, removeConfigs, writeConfig } from './storage';
import { User } from '../types/user/Model';

const tokenKey = 'token';
const userKey = 'user';

export const getToken = () => {
  return readConfig(tokenKey);
};

export const writeToken = (token: string | null) => {
  writeConfig(tokenKey, token);
};

export const getUser = () => {
  return readConfig(userKey);
};

export const writeUser = (user: User | null) => {
  writeConfig(userKey, user);
};

export const removeTokenUser = () => {
  removeConfigs([tokenKey, userKey]);
};
