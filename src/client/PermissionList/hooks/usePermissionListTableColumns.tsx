import { ColumnsType } from 'antd/es/table';

import ToggleSwitch from 'src/client/_shared/components/ToggleSwitch';
import { PermissionVM } from 'src/client/_shared/types/permission/ViewModel';
import { renderDate } from 'src/client/_shared/utils/commonRender';

import { usePermissionListTableContext } from '../context';

export const usePermissionListTableColumns = () => {
  const { handleUpdatePermissionStatus } = usePermissionListTableContext();
  const columns: ColumnsType<PermissionVM> = [
    {
      title: 'Permission ID',
      dataIndex: 'permissionID',
    },
    {
      title: 'Permission Name',
      dataIndex: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: renderDate,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      render: renderDate,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: PermissionVM['status'], record) => (
        <ToggleSwitch
          defaultChecked={status === 1}
          handleToggle={(checked: boolean) =>
            handleUpdatePermissionStatus(record, checked)
          }
        />
      ),
    },
  ];

  return columns;
};
