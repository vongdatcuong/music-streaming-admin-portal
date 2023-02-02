import { User } from './Model';
import { ActiveStatus } from '../../constants/enum/common';
import { PaginationInfo } from '../common/Model';

export interface GetUserListRequest {
  pagination_info?: PaginationInfo;
  filter?: GetUserListFilter;
}

interface GetUserListFilter {
  user_id?: string;
  email?: string;
  status?: ActiveStatus;
  created_time_from?: number;
  created_time_to?: number;
}

export interface PutUserRequest {
  user?: User;
}

export interface UpdateUserPermissionsRequest {
  user_id?: bigint;
  added_permission_ids?: bigint[];
  deleted_permission_ids?: bigint[];
}

export interface GetUserListAutocompleteRequest {
  pagination_info?: PaginationInfo;
  filter?: GetUserListAutocompleteFilter;
}

interface GetUserListAutocompleteFilter {
  email?: string;
}
