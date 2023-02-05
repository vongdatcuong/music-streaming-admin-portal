import Routes from '../constants/routes';

export const compileErrorText = (
  text: string,
  error_code?: string | number,
  error_desc?: string
): string => {
  if (!error_code) return text;
  return `${text} (${error_code}${error_desc ? ': ' + error_desc : ''})`;
};

export const redirectToLoginPage = () => {
  try {
    const url = Routes.AUTH.LOGIN;
    window.location.href = url;
  } catch (err) {
    console.log(err);
  }
};
