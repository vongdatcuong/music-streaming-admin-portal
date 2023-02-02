import { Permission } from './Model';
import { ActiveStatus } from '../../constants/enum/common';

export interface PermissionVM {
  permissionID: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  status: ActiveStatus;
  raw: Permission;
}
