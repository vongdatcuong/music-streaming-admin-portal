import { ActiveStatus } from '../../constants/enum/common';

export interface User {
  user_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  status?: ActiveStatus;
  new_song_noti?: boolean;
  created_at?: string;
  updated_at?: string;
  permissions?: string[];
}
