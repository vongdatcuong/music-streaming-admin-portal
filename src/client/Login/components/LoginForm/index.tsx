import React from 'react';

// Ant Design
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { generateEmailValidator } from 'src/client/_shared/utils/validators';

import { useLoginContext } from '../../context';

const LoginForm: React.FC = () => {
  const { form, handleSubmit } = useLoginContext();

  return (
    <Form wrapperCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
          },
          {
            validator: generateEmailValidator(),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block={true}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
