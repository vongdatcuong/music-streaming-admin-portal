import { ActiveStatus } from '../constants/enum/common';
import { User } from '../types/user/Model';
import { UserAutocompleteVM, UserVM } from '../types/user/ViewModel';

export const transformUser = (user: User): UserVM => ({
  userID: user.user_id || '',
  email: user.email || '',
  firstName: user.first_name || '',
  lastName: user.last_name || '',
  status: user.status || ActiveStatus.UNKNOWN,
  newSongNoti: user.new_song_noti || false,
  createdAt: Number(user.created_at || ''),
  updatedAt: Number(user.updated_at || ''),
  permissions: user.permissions || [],
  raw: user,
});

export const transformUserAutocomplete = (user: User): UserAutocompleteVM => ({
  userID: user.user_id || '',
  email: user.email || '',
  firstName: user.first_name || '',
  lastName: user.last_name || '',
  status: user.status || ActiveStatus.UNKNOWN,
  newSongNoti: user.new_song_noti || false,
  createdAt: Number(user.created_at || ''),
  updatedAt: Number(user.updated_at || ''),
});
