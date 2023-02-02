import React from 'react';

import { message } from 'antd';

import { ActiveStatus } from 'src/client/_shared/constants/enum/common';
import { useAntPagination } from 'src/client/_shared/hooks/useAntPagination';
import { getUserList, putUser } from 'src/client/_shared/services/user';
import { transformUser } from 'src/client/_shared/transformers/user';
import { GetUserListRequest } from 'src/client/_shared/types/user/Request';
import { UserVM } from 'src/client/_shared/types/user/ViewModel';

export const useUserListTable = () => {
  const [users, setUsers] = React.useState<UserVM[]>([]);

  const userList = useAntPagination<UserVM, GetUserListRequest>(
    async ({ offset, pageSize }) => {
      try {
        const res = await getUserList({
          pagination_info: {
            offset: offset,
            limit: pageSize,
          },
        });

        if (res.success) {
          return {
            data: res.data?.users?.map(transformUser) || [],
            total: Number(res.data?.total_count || 0),
            success: true,
          };
        }

        return {
          data: [],
          total: 0,
          success: true,
        };
      } catch (err) {
        return {
          data: [],
          total: 0,
          success: false,
        };
      }
    },
    { initialLoad: false }
  );

  const handleLoadUsers = React.useCallback(async () => {
    try {
      const users = (await userList.refreshTable()) as UserVM[];
      setUsers(users);
    } catch {
      return;
    }
  }, []);

  React.useEffect(() => {
    handleLoadUsers();
  }, [handleLoadUsers]);

  const handleUpdateUserNewSongNoti = async (
    user: UserVM,
    newSongNoti: boolean
  ) => {
    try {
      const res = await putUser({
        user: {
          ...user.raw,
          new_song_noti: newSongNoti,
        },
      });

      if (res.success) {
        message.success('Update user new song notification flag successfully');

        const updatedUsers = users.map((item) => {
          if (item.userID === user.userID) {
            return {
              ...item,
              newSongNoti,

              raw: {
                ...item.raw,
                new_song_noti: newSongNoti,
              },
            };
          }
          return item;
        });
        setUsers(updatedUsers);

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

  const handleUpdateUserStatus = async (user: UserVM, newStatus: boolean) => {
    try {
      const newActiveStatus = newStatus
        ? ActiveStatus.ACTIVE
        : ActiveStatus.INACTIVE;
      const res = await putUser({
        user: {
          ...user.raw,
          status: newActiveStatus,
        },
      });

      if (res.success) {
        message.success('Update user status successfully');

        const updatedUsers = users.map((item) => {
          if (item.userID === user.userID) {
            return {
              ...item,
              status: newActiveStatus,

              raw: {
                ...item.raw,
                status: newActiveStatus,
              },
            };
          }
          return item;
        });
        setUsers(updatedUsers);
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
    users,
    userList,
    handleUpdateUserNewSongNoti,
    handleUpdateUserStatus,
    handleLoadUsers,
  };
};
