import EndPoint from '../constants/api';
import {
  CreatePermissionRequest,
  PutPermissionRequest,
} from '../types/permission/Request';
import {
  CreatePermissionResponse,
  GetPermissionListResponse,
  PutPermissionResponse,
} from '../types/permission/Response';
import { post, put } from '../utils/wsaRequest';

export const getPermissionList = async () => {
  const [res, err] = await post<never, GetPermissionListResponse>({
    url: EndPoint.PermissionAPI.GET_PERMISSION_LIST,
    errorMsgForUser: 'Failed to get permissions list.',
  });

  return {
    data: res?.data,
    success: !err?.msg,
  };
};

export const createPermission = async (dataReq: CreatePermissionRequest) => {
  const [, err] = await post<CreatePermissionRequest, CreatePermissionResponse>(
    {
      url: EndPoint.PermissionAPI.CREATE_PERMISSION,
      data: dataReq,
      errorMsgForUser: 'Failed to create permission.',
    }
  );

  return {
    success: !err?.msg,
  };
};

export const putPermission = async (dataReq: PutPermissionRequest) => {
  const [, err] = await put<PutPermissionRequest, PutPermissionResponse>({
    url: EndPoint.PermissionAPI.PUT_PERMISSION,
    data: dataReq,
    errorMsgForUser: 'Failed to update permission.',
  });

  return {
    success: !err?.msg,
  };
};
