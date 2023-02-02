import { Song } from './Model';
import { LanguageEnum } from '../../constants/language';
import { NameValueInt32PairVM } from '../common/ViewModel';

export interface SongVM {
  songID: string;
  name: string;
  genre: NameValueInt32PairVM;
  artist: string;
  duration: number; // float
  language: LanguageEnum;
  rating: number; // float
  resourceID: string;
  resourceLink: string;
  createdAt: number;
  updatedAt: number;
  raw: Song;
}
