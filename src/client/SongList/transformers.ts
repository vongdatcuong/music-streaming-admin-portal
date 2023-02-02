import { CreateEditSongFormVM } from './types/ViewModel';
import { LanguageEnum } from '../_shared/constants/language';
import { Song } from '../_shared/types/song/Model';
import { SongVM } from '../_shared/types/song/ViewModel';

export const transformSongVMToFormVM = (
  songVM: SongVM
): Partial<CreateEditSongFormVM> => ({
  songID: songVM.songID,
  name: songVM.name,
  genre: songVM.genre.value,
  artist: songVM.artist,
  language: songVM.language || LanguageEnum.UNKNOWN,
});

export const transformCreateSongFormVMToAPIParams = (
  formData: CreateEditSongFormVM
): Partial<Song> => ({
  name: formData.name || '',
  genre: {
    value: Number(formData.genre || ''),
  },
  language: formData.language || LanguageEnum.UNKNOWN,
  artist: formData.artist,
});

export const transformEditSongFormVMToAPIParams = (
  formData: CreateEditSongFormVM
): Partial<Song> => ({
  song_id: BigInt(formData.songID || ''),
  name: formData.name || '',
  genre: {
    value: Number(formData.genre || ''),
  },
  language: formData.language || LanguageEnum.UNKNOWN,
  artist: formData.artist,
});
