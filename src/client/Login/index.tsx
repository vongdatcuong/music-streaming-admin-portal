// React
import React from 'react';

// Ant Design
import { Spin, Typography } from 'antd';

// Assets
import Image from 'src/assets/no_permission.jpg';

// Styles
import styles from './styles.module.scss';

const { Title } = Typography;

import LoginForm from './components/LoginForm';
import { CombinedLoginContext, useLoginContext } from './context';
import { withContext } from '../_shared/utils/context';

const Login = () => {
  const { loginAsync } = useLoginContext();

  return (
    <div className={styles.container}>
      {/* No Permission UI */}
      <div className={styles.noPermContainer}>
        <img src={Image} alt="no-permission" />
      </div>
      <div className={styles.formContainer}>
        <Title level={4}>Login</Title>
        <LoginForm />
        {loginAsync.isPending && <Spin size="large" className={styles.spin} />}
        {loginAsync.value?.errorMsg && (
          <Typography.Text type="danger">
            {loginAsync.value?.errorMsg}
          </Typography.Text>
        )}
      </div>
    </div>
  );
};

export default withContext(Login, CombinedLoginContext);
