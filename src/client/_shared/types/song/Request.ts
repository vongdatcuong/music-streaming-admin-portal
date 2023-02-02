import { UploadFile } from 'antd';

import { Song } from './Model';
import { PaginationInfo } from '../common/Model';

export interface GetSongListRequest {
  pagination_info?: PaginationInfo;
  filter?: GetSongListFilter;
}

export interface GetSongListFilter {
  name?: string;
  genre?: number;
  artist?: string;
  duration?: number;
  language?: string;
  created_time_from?: number;
  created_time_to?: number;
}

export interface CreateSongRequest {
  song?: Partial<Song>;
}

export interface PutSongRequest {
  song?: Partial<Song>;
}

export interface UploadSongRequest {
  file: UploadFile;
}
