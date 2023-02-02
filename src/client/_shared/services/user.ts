import EndPoint from '../constants/api';
import {
  GetUserListAutocompleteRequest,
  GetUserListRequest,
  PutUserRequest,
  UpdateUserPermissionsRequest,
} from '../types/user/Request';
import {
  GetUserListAutocompleteResponse,
  GetUserListResponse,
  PutUserResponse,
  UpdateUserPermissionsResponse,
} from '../types/user/Response';
import { post, put } from '../utils/wsaRequest';

export const getUserList = async (dataReq: GetUserListRequest) => {
  const [res, err] = await post<GetUserListRequest, GetUserListResponse>({
    url: EndPoint.UserAPI.GET_USER_LIST,
    data: dataReq,
    errorMsgForUser: 'Failed to get user list.',
  });

  return {
    data: res?.data,
    success: !err?.msg,
  };
};

export const putUser = async (dataReq: PutUserRequest) => {
  const [, err] = await put<PutUserRequest, PutUserResponse>({
    url: EndPoint.UserAPI.PUT_USER,
    data: dataReq,
    errorMsgForUser: 'Failed to update user.',
  });

  return {
    success: !err?.msg,
  };
};

export const updateUserPermissions = async (
  dataReq: UpdateUserPermissionsRequest
) => {
  const [, err] = await post<
    UpdateUserPermissionsRequest,
    UpdateUserPermissionsResponse
  >({
    url: EndPoint.UserAPI.UPDATE_USER_PERMISSIONS,
    data: dataReq,
    errorMsgForUser: 'Failed to update user permissions',
  });

  return {
    success: !err?.msg,
  };
};

export const getUserListAutocomplete = async (
  dataReq: GetUserListAutocompleteRequest
) => {
  const [res, err] = await post<
    GetUserListAutocompleteRequest,
    GetUserListAutocompleteResponse
  >({
    url: EndPoint.UserAPI.GET_USER_LIST_AUTOCOMPLETE,
    data: dataReq,
    errorMsgForUser: 'Failed to get user list autocomplete.',
  });

  return {
    data: res?.data,
    success: !err?.msg,
  };
};
