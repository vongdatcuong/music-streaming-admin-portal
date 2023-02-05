import { RuleObject } from 'antd/es/form';

import { EMAIL_REGEX } from '../constants/regex';

export const generateEmailValidator = (message = 'Invalid email') => {
  return (_: RuleObject, value: string) => {
    // must be positive integer
    if (value && !EMAIL_REGEX.test(value)) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  };
};
