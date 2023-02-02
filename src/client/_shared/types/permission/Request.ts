import { Permission } from './Model';

export interface CreatePermissionRequest {
  permission?: Partial<Permission>;
}

export interface PutPermissionRequest {
  permission?: Permission;
}
