import { ActiveStatus } from '../../constants/enum/common';

export interface Permission {
  permission_id?: string;
  name?: string;
  created_at: string;
  updated_at: string;
  status: ActiveStatus;
}
