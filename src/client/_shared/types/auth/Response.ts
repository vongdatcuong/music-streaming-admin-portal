import { BaseResponse } from '../common/Response';
import { User } from '../user/Model';

export interface LoginResponse extends BaseResponse {
  token?: string;
  user?: User;
}
