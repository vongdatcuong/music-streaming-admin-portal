import { UserVM } from '../types/user/ViewModel';
import { getUser } from '../utils/auth';

export const useUser = () => {
  const user: UserVM = getUser();

  return {
    user,
  };
};
