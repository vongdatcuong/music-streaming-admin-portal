import React from 'react';

import { Button, Table } from 'antd';

import CreatePermissionModal from './components/CreatePermissionModal';
import { usePermissionListTableColumns } from './hooks/usePermissionListTableColumns';
import {
  CombinedPermissionListContext,
  useCreatePermissionModalContext,
  usePermissionListTableContext,
} from './context';
import Card from '../_shared/components/Card';
import PageHeader from '../_shared/components/PageHeader';
import PageWrapper from '../_shared/components/PageWrapper';
import { withContext } from '../_shared/utils/context';

const PermissionList: React.FC = () => {
  const { permissions, isPendingGettingPerms } =
    usePermissionListTableContext();
  const columns = usePermissionListTableColumns();
  const { handleOpenModal } = useCreatePermissionModalContext();

  return (
    <PageWrapper>
      <PageHeader title="Permissions" />
      <Card title={`${permissions.length || 0} items`}>
        <Table
          rowKey="permissionID"
          columns={columns}
          scroll={{ x: 'max-content' }}
          dataSource={permissions}
          loading={isPendingGettingPerms}
          title={() => (
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={handleOpenModal}>
                New Permission
              </Button>
            </div>
          )}
        />
        <CreatePermissionModal />
      </Card>
    </PageWrapper>
  );
};

export default withContext(PermissionList, CombinedPermissionListContext);
