import * as React from 'react';

import { NavLink } from 'react-router-dom';
import { Layout, Result } from 'antd';

import PageWrapper from 'src/client/_shared/components/PageWrapper';

export const layout = 'fluid';

const Page404: React.ComponentType<{ error?: string }> = ({
  error,
}: {
  error?: string;
}): JSX.Element => {
  if (error) {
    console.error(error);
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <PageWrapper>
        <Result
          status="404"
          title="404"
          subTitle={error || 'Sorry, the page you visited does not exist.'}
          extra={<NavLink to="/">back to home</NavLink>}
        />
      </PageWrapper>
    </Layout>
  );
};

export default Page404;
