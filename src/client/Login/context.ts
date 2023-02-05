import constate from 'constate';

import { useLogin } from './hooks/useLogin';
import { combineProviders } from '../_shared/utils/context';

export const [LoginContext, useLoginContext] = constate(useLogin);

export const CombinedLoginContext = combineProviders([LoginContext]);
