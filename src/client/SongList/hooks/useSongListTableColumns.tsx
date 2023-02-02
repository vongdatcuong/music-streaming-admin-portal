import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';

import {
  LanguageEnum,
  LanguageEnumMap,
} from 'src/client/_shared/constants/language';
import { SongVM } from 'src/client/_shared/types/song/ViewModel';
import { renderDate } from 'src/client/_shared/utils/commonRender';
import { formatSongDuration } from 'src/client/_shared/utils/datetime';

import { useCreateEditSongModalContext } from '../context';

export const useSongListTableColumns = () => {
  const { handleOpenModal } = useCreateEditSongModalContext();

  const columns: ColumnsType<SongVM> = [
    {
      title: 'Song ID',
      dataIndex: 'songID',
    },
    {
      title: 'Song Name',
      dataIndex: 'name',
    },
    {
      title: 'Genre',
      dataIndex: ['genre', 'name'],
    },
    {
      title: 'Artist',
      dataIndex: 'artist',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      render: (value) => formatSongDuration(value),
    },
    {
      title: 'Language',
      dataIndex: 'language',
      render: (value: LanguageEnum) =>
        LanguageEnumMap[value || LanguageEnum.UNKNOWN],
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
    },
    {
      title: 'Resource',
      dataIndex: 'resourceLink',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: renderDate,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      render: renderDate,
    },
    {
      title: 'Action',
      fixed: 'right',
      render: (_, record: SongVM) => (
        <Button onClick={() => handleOpenModal(record)}>Edit</Button>
      ),
    },
  ];

  return columns;
};
