import { UploadFile } from 'antd';

import { LanguageEnum } from 'src/client/_shared/constants/language';

export interface CreateEditSongFormVM {
  songID?: string;
  name: string;
  genre: number;
  artist: string;
  language: LanguageEnum;
  file: UploadFile;
  duration: number;
  resource_id: string;
  resource_link: string;
}
