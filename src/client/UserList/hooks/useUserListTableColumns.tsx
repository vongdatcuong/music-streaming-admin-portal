import { ColumnsType } from 'antd/es/table';

import ToggleSwitch from 'src/client/_shared/components/ToggleSwitch';
import { UserVM } from 'src/client/_shared/types/user/ViewModel';
import {
  renderDate,
  renderListLineByLine,
} from 'src/client/_shared/utils/commonRender';

import { useUserListTableContext } from '../context';

export const useUserListTableColumns = () => {
  const { handleUpdateUserNewSongNoti, handleUpdateUserStatus } =
    useUserListTableContext();

  const columns: ColumnsType<UserVM> = [
    {
      title: 'User ID',
      dataIndex: 'userID',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
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
      title: 'New Song Notification',
      dataIndex: 'newSongNoti',
      render: (noti: UserVM['newSongNoti'], record) => (
        <ToggleSwitch
          defaultChecked={noti}
          handleToggle={(checked: boolean) =>
            handleUpdateUserNewSongNoti(record, checked)
          }
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: UserVM['status'], record) => (
        <ToggleSwitch
          defaultChecked={status === 1}
          handleToggle={(checked: boolean) =>
            handleUpdateUserStatus(record, checked)
          }
        />
      ),
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      render: renderListLineByLine,
    },
  ];

  return columns;
};
