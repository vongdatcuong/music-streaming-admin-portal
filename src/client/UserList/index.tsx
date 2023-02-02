import React from 'react';

import { Button, Table } from 'antd';

import GrantUserPermissionsModal from './components/GrantUserPermissionsModal';
import { useUserListTableColumns } from './hooks/useUserListTableColumns';
import {
  CombinedUserListContext,
  useGrantUserPermModalContext,
  useUserListTableContext,
} from './context';
import Card from '../_shared/components/Card';
import PageHeader from '../_shared/components/PageHeader';
import PageWrapper from '../_shared/components/PageWrapper';
import { withContext } from '../_shared/utils/context';

const UserList: React.FC = () => {
  const { userList } = useUserListTableContext();
  const columns = useUserListTableColumns();
  const { handleOpenModal } = useGrantUserPermModalContext();

  return (
    <PageWrapper>
      <PageHeader title="Users" />
      <Card title={`${userList.totalRef.current} items`}>
        <Table
          rowKey="userID"
          columns={columns}
          scroll={{ x: 'max-content' }}
          title={() => (
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={() => handleOpenModal()}>
                Grant User Permission
              </Button>
            </div>
          )}
          {...userList.tableProps}
        />
        <GrantUserPermissionsModal />
      </Card>
    </PageWrapper>
  );
};

export default withContext(UserList, CombinedUserListContext);
