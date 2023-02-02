/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { AxiosInstance } from './customRequest';
import { compileErrorText as constructErrorText } from './index';

interface ErrorConfig {
  msgKey: string;
  codeKey: string;
}

interface ErrorMessageMap {
  [key: number]: string;
}

interface Options<T> {
  url: string;
  method?: Method;
  data?: T;

  /** If set to true and `error_code` exists, it will call `message.error`
   * The message looks like:
   *
   *  "[errorMsgForUser]: ([error_code]: [error_message])".
   *
   * e.g. "Something went wrong. (19999231: error_database)"
   */
  showError?: boolean;
  errorHandler?: (res: any) => WsaError | undefined;

  /** Will be shown to the user when `error_code` exist*/
  otherAxiosRequestConfig?: AxiosRequestConfig;

  errorMsgForUser?: string;
  errorMsgMap?: ErrorMessageMap;
  ignoredErrorCodes?: number[];
}

/** Currently this is not quite useful and not extra data contains in it.
 *  But it's a good idea to keep it in case we need to add extra data in the future
 *  and we want to keep the interface consistent
 */
export interface WsaError {
  /** msg is for the developer */
  msg?: string;
}

// If BE proposes a new format, try these 2 steps:
// - Argue with them, try convincing them to use one of these 3 below instead
// - If somehow they're too stubborn, add a new ErrorConfig object here
const errorConfigList: ErrorConfig[] = [
  {
    msgKey: 'error_msg',
    codeKey: 'error',
  },
  {
    msgKey: 'errdesc',
    codeKey: 'errcode',
  },
  {
    msgKey: 'error_message',
    codeKey: 'error_code',
  },
];

async function wsaRequest<
  TRequest extends Record<string, any>,
  TResponse extends Record<string, any>
>({
  url,
  data,
  method = 'POST',

  // error related
  showError = true,
  errorHandler,
  errorMsgForUser = 'Something went wrong.',
  errorMsgMap = {},

  /** ignored error codes won't show message */
  ignoredErrorCodes = [],
  otherAxiosRequestConfig,
}: Options<TRequest>): Promise<[TResponse?, WsaError?]> {
  const config: AxiosRequestConfig = {
    method: method,
    params: method === 'GET' ? data : {},
    data,
    ...otherAxiosRequestConfig,
  };

  const defaultErrorHandler = (response: TResponse) => {
    const errorConfig =
      errorConfigList.find(({ codeKey }) => codeKey in response) ||
      errorConfigList[0];
    const code = response[errorConfig.codeKey];
    const msg = response[errorConfig.msgKey];

    let error: WsaError | undefined = undefined;

    const hasError = code && !ignoredErrorCodes.includes(code);
    if (hasError) {
      error = {
        msg:
          errorMsgMap[code] ?? constructErrorText(errorMsgForUser, code, msg),
      };
    }

    return error;
  };

  try {
    const axiosResponse: AxiosResponse<TResponse> = await AxiosInstance(
      url,
      config
    );

    const dataReturned = axiosResponse.data;

    // Success (But maybe still have error code)
    if (axiosResponse && axiosResponse.status === 200) {
      // Show the error if any
      const wsaError = errorHandler
        ? errorHandler(dataReturned)
        : defaultErrorHandler(dataReturned);

      if (wsaError && showError) {
        message.error(wsaError.msg);
      }

      return Promise.resolve([dataReturned, wsaError]);
    }

    // Getting error like 404 or 500, it will prompt the message in the interceptor
    return Promise.resolve([
      undefined,
      { msg: 'Something went wrong. Check the console' },
    ]);
  } catch (error) {
    // Getting some unknown errors. Developer will need to debug
    // console.log for the developer to debug
    // eslint-disable-next-line no-console
    console.log(error);

    return Promise.resolve([
      undefined,
      { msg: 'Something went wrong. Check the console' },
    ]);
  }
}

const get = wsaRequestBuilder({
  method: 'GET',
});

const post = wsaRequestBuilder({
  method: 'POST',
});

const put = wsaRequestBuilder({
  method: 'PUT',
});

/**
 * We can use this builder to build the request function with some default options
 *
 * Check the `get` and `post` functions for more details
 */
function wsaRequestBuilder(
  defaultOptions: Omit<Options<unknown>, 'data' | 'url'>
) {
  return async function <
    TRequest extends Record<string, any>,
    TResponse extends Record<string, any>
  >(options: Options<TRequest>): Promise<[TResponse?, WsaError?]> {
    return wsaRequest<TRequest, TResponse>({
      ...defaultOptions,
      ...options,
    });
  };
}

export { wsaRequest, wsaRequestBuilder, get, post, put };
