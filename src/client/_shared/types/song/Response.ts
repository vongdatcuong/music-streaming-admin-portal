import { Song } from './Model';
import { BaseResponse } from '../common/Response';

export interface GetSongListResponse extends BaseResponse {
  data?: GetSongListResponseData;
}

interface GetSongListResponseData {
  songs?: Song[];
  total_count?: string;
}

export type CreateSongResponse = BaseResponse;
export type PutSongResponse = BaseResponse;

export interface UploadSongResponse extends BaseResponse {
  data?: UploadSongResponseData;
}

export interface UploadSongResponseData {
  resource_id?: string;
  resource_link?: string;
}
