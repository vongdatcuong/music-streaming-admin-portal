import constate from 'constate';

import { useGrantUserPermissionModal } from './hooks/useGrantUserPermissionModal';
import { useUserListTable } from './hooks/useUserListTable';
import { combineProviders } from '../_shared/utils/context';

export const [UserListTableContext, useUserListTableContext] =
  constate(useUserListTable);
export const [GrantUserPermModalContext, useGrantUserPermModalContext] =
  constate(useGrantUserPermissionModal);

export const CombinedUserListContext = combineProviders([
  UserListTableContext,
  GrantUserPermModalContext,
]);
