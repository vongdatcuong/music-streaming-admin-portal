import EndPoint from '../constants/api';
import { GetGenreOptionsListResponse } from '../types/genre/Response';
import { post } from '../utils/wsaRequest';

export const getGenreOptionsList = async () => {
  const [res, err] = await post<never, GetGenreOptionsListResponse>({
    url: EndPoint.GenreAPI.GET_GENRE_OPTIONS_LIST,
    errorMsgForUser: 'Failed to get genre options list.',
  });

  return {
    data: res?.data,
    success: !err?.msg,
  };
};
