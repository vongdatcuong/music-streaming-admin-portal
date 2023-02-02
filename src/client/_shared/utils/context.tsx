import React from 'react';

// This is just a util HOC
export function withContext<
  Props extends JSX.IntrinsicAttributes & { children?: React.ReactNode }
>(
  Component: React.FC<Props>,
  Context: React.ComponentType<React.PropsWithChildren<unknown>>
) {
  return function children(props: Props) {
    return (
      <Context>
        <Component {...props} />
      </Context>
    );
  };
}

// Copied from here Order Admin
export const combineProviders = (providers: React.ComponentType[]) =>
  providers.reduce(
    (Combined, Provider) =>
      function render({ children }: React.PropsWithChildren<unknown>) {
        return (
          <Combined>
            <Provider>{children}</Provider>
          </Combined>
        );
      }
  );
