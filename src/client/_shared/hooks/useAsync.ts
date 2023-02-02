import { useCallback, useEffect, useMemo, useState } from 'react';

// Improve from https://usehooks.com/useAsync/
type AsyncFunc<TParams extends unknown[], TData> = (
  ...params: TParams
) => Promise<TData>;

type Statuses = 'idle' | 'pending' | 'success' | 'error';

export type AsyncResult<TParams extends unknown[], TData, TError> = {
  execute: AsyncFunc<TParams, TData | TError>;
  status: Statuses;
  value: TData | null;
  error: TError | null;
  isPending: boolean;
  isEmptyAndFetching: boolean;
};

export const useAsync = <
  TParams extends unknown[],
  TData,
  TError = never /* by default, expect the asyncFunction to never throw exception, i.e to catch exceptions inside it already */
>(
  /** For performance opimization, if you don't want useAsync to get new reference every time the component rerendered, do not inline "asyncFunction", put it outside of the component instead */
  asyncFunction: AsyncFunc<TParams, TData>,
  immediate: false | TParams = false
): AsyncResult<TParams, TData, TError> => {
  const [status, setStatus] = useState<Statuses>('idle');
  const [value, setValue] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);

  const execute = useCallback(
    (...params: TParams) => {
      setStatus('pending');
      setError(null);
      return asyncFunction(...params)
        .then((response) => {
          setValue(response);
          setStatus('success');
          return response;
        })
        .catch((error: TError) => {
          setError(error);
          setStatus('error');
          return error;
        });
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate !== false) {
      execute(...immediate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      execute,
      status,
      value,
      error,
      isPending: status === 'pending',
      isEmptyAndFetching: status === 'pending' && value == null, // whether this is the first fetch. This variable supports the "stale-while-revalidate" UX (only show loading state for the first fetch).
    }),
    [error, execute, status, value]
  );
};
