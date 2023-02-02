import { User } from './Model';
import { ActiveStatus } from '../../constants/enum/common';

export interface UserVM {
  userID: string;
  email: string;
  firstName: string;
  lastName: string;
  status: ActiveStatus;
  newSongNoti: boolean;
  createdAt: number;
  updatedAt: number;
  permissions: string[];
  raw: User;
}

export type UserAutocompleteVM = Omit<UserVM, 'permissions' | 'raw'>;
