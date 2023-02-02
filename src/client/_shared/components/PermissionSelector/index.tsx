import React from 'react';

import { Select, SelectProps } from 'antd';

import { useAsync } from '../../hooks/useAsync';
import { getPermissionList } from '../../services/permission';

export const PERMISSION_ID_NAME_SEPARATOR = '#';

interface Props extends SelectProps {
  includePermissionName?: boolean;
}

// value can only both permission id and name: 1_music_streaming.user.read
// TODO: Update BE to allow update user permission with permission names
const PermissionSelector: React.FC<Props> = ({
  includePermissionName = false,
  ...restProps
}) => {
  const getPermissionsAsync = useAsync(getPermissionList, []);

  return (
    <Select
      showSearch
      options={
        getPermissionsAsync.value?.data?.permissions?.map((permission) => ({
          label: permission.name || '',
          value: includePermissionName
            ? [permission.permission_id, permission.name].join(
                PERMISSION_ID_NAME_SEPARATOR
              )
            : permission.permission_id,
        })) || []
      }
      placeholder="Select permission"
      loading={getPermissionsAsync.isPending}
      optionFilterProp="label"
      {...restProps}
    />
  );
};

export default PermissionSelector;
