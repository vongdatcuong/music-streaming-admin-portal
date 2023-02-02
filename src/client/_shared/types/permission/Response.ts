import { Permission } from './Model';
import { BaseResponse } from '../common/Response';

export interface GetPermissionListResponse extends BaseResponse {
  data?: GetPermissionListResponseData;
}

interface GetPermissionListResponseData {
  permissions?: Permission[];
}

export type CreatePermissionResponse = BaseResponse;
export type PutPermissionResponse = BaseResponse;
