import { GrantUserPermissionFormVM } from './types/ViewModel';
import { PERMISSION_ID_NAME_SEPARATOR } from '../_shared/components/PermissionSelector';
import { UpdateUserPermissionsRequest } from '../_shared/types/user/Request';

export const transformGrantUserPermModalToAPIParams = (
  formData: GrantUserPermissionFormVM
): Partial<UpdateUserPermissionsRequest> => {
  return {
    user_id: BigInt(formData.userID),
    added_permission_ids: formData.permissionIDs?.map(
      (perm) => BigInt(perm.split(PERMISSION_ID_NAME_SEPARATOR)[0]) // TODO: Improve this by improving BE
    ),
    deleted_permission_ids: [],
  };
};
