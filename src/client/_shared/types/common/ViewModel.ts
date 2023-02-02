export interface NameValueInt32PairVM {
  name: string;
  value: number;
}

export interface PaginationInfoVM {
  offset: number;
  limit: number;
}

export type Nullable<T> = T | null | undefined;

export type FormatTimeFullTzSettings = {
  unix?: boolean | 'auto-detect';
  format?: string;
};
