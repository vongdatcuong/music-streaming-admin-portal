import { message } from 'antd';
import { ErrorCode, ErrorMessages } from '../constants/error/errorCodes';
import { BaseResponse } from '../types/common/Model';

/** Handle Error in successful requests:
 * Even though requests can be successful with Status code 200, there're still other internal errors that need to be handled
 */
export const handleInternalError = (
  msg: string,
  response: BaseResponse,
  options?: { duration?: number }
) => {
  if (response.error) {
    const errorMsg = `${
      response.error_msg || ErrorMessages[response.error as ErrorCode] || msg
    } (${response.error})`;
    message.error(errorMsg, options?.duration);
    return false;
  }
  return true;
};
