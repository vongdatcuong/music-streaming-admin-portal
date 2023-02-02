import { message } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import JSONBigInt from 'json-bigint';

interface Params<T> {
  url: string;
  method?: Method;
  data?: T;
  params?: T;
  requestConfig?: AxiosRequestConfig;
}

const baseURL = '/api';

const safeParseJson = (stringToParse: string) => {
  if (!stringToParse) {
    return null;
  }

  try {
    return JSONBigInt.parse(stringToParse);
  } catch (error) {
    console.error('[JSON] error while parsing JSON', { stringToParse, error });
    return null;
  }
};

const redirectToLoginPage = (loginUrl: string) => {
  const url = new URL(loginUrl);
  const searchParams = new URLSearchParams(url.search);
  searchParams.set('next', location.href);
  location.href = `${url.origin + url.pathname}?${searchParams.toString()}`;
};

/**
 * Handler for network errors with HTTP code 401, 403, 404 or 500.
 */
const errorHandler = (error: AxiosError) => {
  const status = error?.response?.status;
  switch (status) {
    case 400:
      message.error(
        `[${status}] The request cannot be fulfilled due to bad syntax.`
      );
      break;
    case 401: {
      const loginUrl =
        //@ts-ignore TODO TODO TODO
        error.response?.data.result || error.response?.data.LOGIN_URL;

      if (!loginUrl) {
        return message.error(
          `[${status}] You are currently unauthorized. Please log in.`
        );
      }
      redirectToLoginPage(loginUrl);
      break;
    }
    case 403:
      message.error(
        `[${status}] You have no permission to access this resource.`
      );
      break;
    case 404:
      message.error(
        `[${status}] The requested resource cannot be found on the server.`
      );
      break;
    case 500:
      message.error(`[${status}] Internal Server Error!`);
      break;
    default:
      message.error(`Network Error!`);
      break;
  }
  return Promise.reject(error);
};

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    // default use JSON
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'Bearer',
  },
  // transformResponse copied from this article:
  // https://itstalwar15.medium.com/handling-bigint-in-axios-using-json-big-in-javascript-d915ae85ffc0
  // It's also accepted as cited here:
  // https://github.com/axios/axios/issues/3440#issuecomment-834039631
  transformResponse: [
    (data) => {
      if (typeof data === 'string') {
        try {
          data = JSONBigInt.parse(data);
        } catch (e) {
          /* Ignore */
        } // Added this Ignore as it's the same in the Axios
      }
      return data;
    },
  ],
  // For normal cases, it'll work just like the native JSON.stringify, however, let's see the example below:
  // const x = "9223372036854775807";
  // console.log(JSON.stringify(JSONBigInt.parse(x))); => "9223372036854775807" (String)
  // console.log(JSONBigInt.stringify(JSONBigInt.parse(x))); => 9223372036854775807 (Number)
  // So the native JSON.stringify will unexpectedly convert the Number to String when as number is large enough.
  transformRequest: [(request) => JSONBigInt.stringify(request)],
});

// Request interceptors
instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptors
instance.interceptors.response.use((res) => {
  return res;
}, errorHandler);

export async function customRequest<T, U>({
  url,
  method = 'POST',
  data,
  params,
  requestConfig,
}: Params<T>): Promise<U> {
  const config: AxiosRequestConfig = {
    transformResponse: [(res) => safeParseJson(res)],
    transformRequest: [(req) => JSONBigInt.stringify(req)],
    method,
    params,
    data,
    ...requestConfig,
  };
  const resp = await instance(url, config);
  if (resp && resp.status === 200) {
    return Promise.resolve(resp.data);
  }
  return Promise.reject(resp.data);
}

export { instance as AxiosInstance };
export default customRequest;
