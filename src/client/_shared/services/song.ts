import { FileUploadRequestConfig } from '.';
import EndPoint from '../constants/api';
import { transformSong } from '../transformers/song';
import {
  CreateSongRequest,
  GetSongListRequest,
  PutSongRequest,
  UploadSongRequest,
} from '../types/song/Request';
import {
  CreateSongResponse,
  GetSongListResponse,
  PutSongResponse,
  UploadSongResponse,
} from '../types/song/Response';
import customRequest from '../utils/customRequest';
import { handleInternalError } from '../utils/handleInternalError';
import { post, put } from '../utils/wsaRequest';

export const getSongList = async (dataReq: GetSongListRequest) => {
  const url = EndPoint.SongAPI.GET_SONG_LIST;

  const response = await customRequest<GetSongListRequest, GetSongListResponse>(
    {
      method: 'POST',
      url,
      data: dataReq,
    }
  );

  const handleErrorRes = handleInternalError(
    `Failed to fetch song list`,
    response
  );

  return {
    success: handleErrorRes,
    songs: response.data?.songs?.map(transformSong) || [],
    totalCount: response.data?.total_count || 0,
  };
};

export const createSong = async (dataReq: CreateSongRequest) => {
  const [, err] = await post<CreateSongRequest, CreateSongResponse>({
    url: EndPoint.SongAPI.CREATE_SONG,
    data: dataReq,
    errorMsgForUser: 'Failed to create song',
  });

  return {
    success: !err?.msg,
  };
};

export const putSong = async (dataReq: PutSongRequest) => {
  const [, err] = await put<PutSongRequest, PutSongResponse>({
    url: EndPoint.SongAPI.PUT_SONG,
    data: dataReq,
    errorMsgForUser: 'Failed to update song',
  });

  return {
    success: !err?.msg,
  };
};

export const uploadSong = async (dataReq: UploadSongRequest) => {
  const [res, err] = await post<UploadSongRequest, UploadSongResponse>({
    url: EndPoint.SongAPI.UPLOAD_SONG,
    data: dataReq,
    errorMsgForUser: 'Failed to upload song',
    otherAxiosRequestConfig: FileUploadRequestConfig,
  });

  return {
    data: res?.data,
    success: !err?.msg,
  };
};
