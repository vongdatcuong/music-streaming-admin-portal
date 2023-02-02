import constate from 'constate';

import { useCreatePermissionModal } from './hooks/useCreatePermissionModal';
import { usePermissionListTable } from './hooks/usePermissionListTable';
import { combineProviders } from '../_shared/utils/context';

export const [PermissionListTableContext, usePermissionListTableContext] =
  constate(usePermissionListTable);
export const [CreatePermissionModalContext, useCreatePermissionModalContext] =
  constate(useCreatePermissionModal);

export const CombinedPermissionListContext = combineProviders([
  PermissionListTableContext,
  CreatePermissionModalContext,
]);
