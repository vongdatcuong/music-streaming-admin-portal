import { ActiveStatus } from '../constants/enum/common';
import { Permission } from '../types/permission/Model';
import { PermissionVM } from '../types/permission/ViewModel';

export const transformPermission = (perm: Permission): PermissionVM => ({
  permissionID: perm.permission_id || '',
  name: perm.name || '',
  createdAt: Number(perm.created_at || ''),
  updatedAt: Number(perm.updated_at || ''),
  status: perm.status || ActiveStatus.UNKNOWN,
  raw: perm,
});
