import { useAntPagination } from 'src/client/_shared/hooks/useAntPagination';
import { getSongList } from 'src/client/_shared/services/song';
import { GetSongListRequest } from 'src/client/_shared/types/song/Request';
import { SongVM } from 'src/client/_shared/types/song/ViewModel';

export const useSongListTable = () => {
  const songList = useAntPagination<SongVM, GetSongListRequest>(
    async ({ offset, pageSize }) => {
      try {
        const res = await getSongList({
          pagination_info: {
            offset: offset,
            limit: pageSize,
          },
        });

        if (res.success) {
          return {
            data: res.songs,
            total: Number(res.totalCount),
          };
        }

        return {
          data: [],
          total: 0,
        };
      } catch (err) {
        return {
          data: [],
          total: 0,
        };
      }
    },
    {
      initialLoad: true,
    }
  );

  return {
    songList,
  };
};
