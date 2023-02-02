import { User } from './Model';
import { BaseResponse } from '../common/Response';

export interface GetUserListResponse extends BaseResponse {
  data?: GetUserListResponseData;
}

interface GetUserListResponseData {
  users?: User[];
  total_count?: string;
}

export type PutUserResponse = BaseResponse;
export type UpdateUserPermissionsResponse = BaseResponse;

export interface GetUserListAutocompleteResponse extends BaseResponse {
  data?: GetUserListAutocompleteResponseData;
}

interface GetUserListAutocompleteResponseData {
  users?: User[];
  total_count?: string;
}
