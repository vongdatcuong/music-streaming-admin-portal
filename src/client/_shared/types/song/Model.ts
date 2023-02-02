import { LanguageEnum } from '../../constants/language';
import { NameValueInt32Pair } from '../common/Model';

export interface Song {
  song_id?: bigint;
  name?: string;
  genre?: NameValueInt32Pair;
  artist?: string;
  duration?: number; // float
  language?: LanguageEnum;
  rating?: number; // float
  resource_id?: string;
  resource_link?: string;
  created_at?: number;
  updated_at?: number;
}
