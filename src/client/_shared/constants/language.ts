export enum LanguageEnum {
  UNKNOWN = 'UNKNOWN',
  VN = 'VN',
  CN = 'CN',
  JPN = 'JPN',
  KR = 'JR',
  US = 'US',
}

export const LanguageEnumMap: Record<LanguageEnum, string> = {
  [LanguageEnum.UNKNOWN]: 'Unknown',
  [LanguageEnum.VN]: 'Vietnamese',
  [LanguageEnum.CN]: 'Chinese',
  [LanguageEnum.JPN]: 'Japanese',
  [LanguageEnum.KR]: 'Korean',
  [LanguageEnum.US]: 'American',
};
