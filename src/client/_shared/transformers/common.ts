import { defaultPageSizeOptions } from '../constants/table';
import { NameValueInt32Pair, PaginationInfo } from '../types/common/Model';
import {
  NameValueInt32PairVM,
  PaginationInfoVM,
} from '../types/common/ViewModel';

export const transformNameValueInt32Pair = (
  pair: NameValueInt32Pair
): NameValueInt32PairVM => ({
  name: pair.name || '',
  value: pair.value || 0,
});

export const transformPaginationInfo = (
  paginationInfo: PaginationInfo
): PaginationInfoVM => ({
  offset: paginationInfo.offset || 0,
  limit: paginationInfo.limit || Number(defaultPageSizeOptions[0]),
});
