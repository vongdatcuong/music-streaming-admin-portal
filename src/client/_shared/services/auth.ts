import EndPoint from '../constants/api';
import { LoginRequest } from '../types/auth/Request';
import { LoginResponse } from '../types/auth/Response';
import { post } from '../utils/wsaRequest';

export const login = async (dataReq: LoginRequest) => {
  const [res, err] = await post<LoginRequest, LoginResponse>({
    url: EndPoint.AuthAPI.LOGIN,
    data: dataReq,
    errorMsgForUser: '',
    showError: false,
  });

  return {
    token: res?.token,
    user: res?.user ?? {},
    success: !err?.msg,
    errorMsg: err?.msg,
  };
};
