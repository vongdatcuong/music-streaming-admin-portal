import constate from 'constate';

import { useCreateEditSongModal } from './hooks/useCreateEditSongModal';
import { useSongListTable } from './hooks/useSongListTable';
import { combineProviders } from '../_shared/utils/context';

export const [SongListTableContext, useSongListTableContext] =
  constate(useSongListTable);
export const [CreateEditSongModalContext, useCreateEditSongModalContext] =
  constate(useCreateEditSongModal);

export const CombinedSongListContext = combineProviders([
  SongListTableContext,
  CreateEditSongModalContext,
]);
