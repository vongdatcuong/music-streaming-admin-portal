import { CreatePermissionFormVM } from './types/ViewModel';
import { PERMISSION_PREFIX } from '../_shared/constants';
import { Permission } from '../_shared/types/permission/Model';

export const transformCreatePermissionFormVMToAPIParams = (
  formData: CreatePermissionFormVM
): Partial<Permission> => ({
  name: PERMISSION_PREFIX + (formData.name || ''),
});
