import React from 'react';

import { message, TablePaginationConfig, TableProps } from 'antd';
import { AxiosError } from 'axios';

import { useAsync } from './useAsync';

type RequestFunction<TData, TFilters> = (info: {
  pageSize: number;
  current: number;
  offset: number;
  filters: TFilters;
}) => Promise<{ total: number; data: TData[] } | { error: string }>;

type Settings<TFilters> = {
  initialLoad?: boolean;
  pagination?: TablePaginationConfig;
  transformFilters?: (
    rawFilters: Record<string, (boolean | React.Key)[] | null>
  ) => TFilters;
};

type RefreshTableOptions = {
  resetCurrentPage?: boolean;
  resetFilters?: boolean;
};

export type TReturn<TData, TFilters> = {
  tableProps: TableProps<TData>;
  refreshTable: () => Promise<TData[] | AxiosError>;
  filtersRef: React.MutableRefObject<TFilters>;
  totalRef: React.MutableRefObject<number>;
};

// provide a callback, this hook will then return the necessary props for the <Table /> component with all the handling logic encapsulated
export function useAntPagination<TData, TFilters = Record<string, unknown>>(
  cb: RequestFunction<TData, TFilters>,
  settings: Settings<TFilters> = {}
): TReturn<TData, TFilters> {
  const pageSizeOptions = ['10', '25', '50', '100'];
  const defaultPageSize = Number(pageSizeOptions[0]);
  const pageSizeRef = React.useRef(defaultPageSize);
  const currentPageRef = React.useRef(1);
  const totalRef = React.useRef(0);
  const filtersRef = React.useRef<TFilters>({} as TFilters);

  const asyncData = useAsync(
    // TODO: maybe not any, but a type that matches the data returned by the request function
    async () => {
      const offset = (currentPageRef.current - 1) * pageSizeRef.current;
      const result = await cb({
        pageSize: pageSizeRef.current,
        current: currentPageRef.current,
        offset,
        filters: filtersRef.current,
      });
      if ('error' in result) {
        message.error(result.error);
        return [];
      }
      totalRef.current = result.total;
      return result.data;
    },
    settings.initialLoad === false ? undefined : []
  );

  const refreshTable = (options?: RefreshTableOptions) => {
    const { resetCurrentPage = true, resetFilters = true } = options ?? {};
    if (resetCurrentPage) currentPageRef.current = 1;
    if (resetFilters) filtersRef.current = {} as TFilters;

    return asyncData.execute();
  };

  const tableProps: TableProps<TData> = {
    dataSource: asyncData.value || undefined,
    loading: asyncData.status === 'pending',
    pagination: {
      total: totalRef.current,
      current: currentPageRef.current,
      defaultPageSize,
      pageSizeOptions,
      showSizeChanger: true,
      ...(!settings.transformFilters && {
        onChange: (newCurrent, newPageSize) => {
          const pageSizeChanges =
            newPageSize && newPageSize !== pageSizeRef.current;
          if (pageSizeChanges) {
            currentPageRef.current = 1;
          } else {
            currentPageRef.current = newCurrent;
          }
          if (newPageSize) pageSizeRef.current = newPageSize;
          asyncData.execute();
        },
      }),
      ...settings.pagination, // custom pagination props, will merge with the above pagination props
    },
    ...(!!settings.transformFilters && {
      onChange: (pagination, filters) => {
        currentPageRef.current = pagination.current || 1;
        pageSizeRef.current = pagination.pageSize || defaultPageSize;
        filtersRef.current =
          settings.transformFilters?.(filters) || ({} as TFilters);
        asyncData.execute();
      },
    }),
  };

  return { tableProps, refreshTable, filtersRef, totalRef };
}
