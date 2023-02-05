import { useNavigate } from 'react-router-dom';

import { Form } from 'antd';

import Routes from 'src/client/_shared/constants/routes';
import { useAsync } from 'src/client/_shared/hooks/useAsync';
import { login } from 'src/client/_shared/services/auth';
import { transformUser } from 'src/client/_shared/transformers/user';
import { writeToken, writeUser } from 'src/client/_shared/utils/auth';

import { LoginFormVM } from '../types/ViewModel';

export const useLogin = () => {
  const loginAsync = useAsync(login);
  const [form] = Form.useForm<LoginFormVM>();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormVM) => {
    const res = await loginAsync.execute({
      email: values.email,
      password: values.password,
    });

    if (res.success && res.token) {
      writeToken(res.token);
      writeUser(transformUser(res.user));
      navigate(Routes.HOME);
    }
  };

  return {
    loginAsync,
    form,
    handleSubmit,
  };
};
