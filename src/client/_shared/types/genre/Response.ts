import { NameValueInt32Pair } from '../common/Model';
import { BaseResponse } from '../common/Response';

export interface GetGenreOptionsListResponse extends BaseResponse {
  data?: GetGenreOptionsListResponseData;
}

interface GetGenreOptionsListResponseData {
  genres?: NameValueInt32Pair[];
}
