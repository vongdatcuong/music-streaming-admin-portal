import React from 'react';

import { message } from 'antd';

import { ActiveStatus } from 'src/client/_shared/constants/enum/common';
import { useAsync } from 'src/client/_shared/hooks/useAsync';
import {
  getPermissionList,
  putPermission,
} from 'src/client/_shared/services/permission';
import { transformPermission } from 'src/client/_shared/transformers/permission';
import { PermissionVM } from 'src/client/_shared/types/permission/ViewModel';

export const usePermissionListTable = () => {
  const permissionList = useAsync(getPermissionList);
  const [permissions, setPermissions] = React.useState<PermissionVM[]>([]);

  const handleLoadPermissions = React.useCallback(async () => {
    const { data, success } = (await permissionList.execute()) ?? {};

    if (success) {
      setPermissions(data?.permissions?.map(transformPermission) || []);
    }
  }, [permissionList]);

  React.useEffect(() => {
    handleLoadPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdatePermissionStatus = async (
    permission: PermissionVM,
    newStatus: boolean
  ) => {
    try {
      const newActiveStatus = newStatus
        ? ActiveStatus.ACTIVE
        : ActiveStatus.INACTIVE;
      const res = await putPermission({
        permission: {
          ...permission.raw,
          status: newActiveStatus,
        },
      });

      if (res.success) {
        message.success('Update permission status successfully');

        const updatedPermissions = permissions.map((item) => {
          if (item.permissionID === permission.permissionID) {
            return {
              ...permission,
              status: newActiveStatus,

              raw: {
                ...permission.raw,
                status: newActiveStatus,
              },
            };
          }
          return item;
        });
        setPermissions(updatedPermissions);
        return {
          success: true,
        };
      }

      return {
        success: false,
      };
    } catch {
      return {
        success: true,
      };
    }
  };

  return {
    permissions,
    isPendingGettingPerms: permissionList.isPending,
    handleUpdatePermissionStatus,
    handleLoadPermissions,
  };
};
