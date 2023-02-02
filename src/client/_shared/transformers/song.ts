import { transformNameValueInt32Pair } from './common';
import { LanguageEnum } from '../constants/language';
import { Song } from '../types/song/Model';
import { SongVM } from '../types/song/ViewModel';

export const transformSong = (song: Song): SongVM => ({
  songID: song.song_id?.toString() || '',
  name: song.name || '',
  genre: transformNameValueInt32Pair(song.genre ?? {}),
  artist: song.artist || '',
  duration: song.duration || 0,
  language: song.language || LanguageEnum.UNKNOWN,
  rating: song.rating || 0,
  resourceID: song.resource_id || '',
  resourceLink: song.resource_link || '',
  createdAt: song.created_at || 0,
  updatedAt: song.updated_at || 0,
  raw: song,
});
