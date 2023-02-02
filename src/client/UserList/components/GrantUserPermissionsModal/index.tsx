import React from 'react';

import { Form, Modal } from 'antd';

import PermissionSelector, {
  PERMISSION_ID_NAME_SEPARATOR,
} from 'src/client/_shared/components/PermissionSelector';
import UserSelector from 'src/client/_shared/components/UserSelector';

import {
  useGrantUserPermModalContext,
  useUserListTableContext,
} from '../../context';

const GrantUserPermissionsModal: React.FC = () => {
  const {
    modalVisible,
    form,
    handleCloseModal,
    handleUpdateUserPermissionsAsync,
    updateUserPermissionsAsync,
  } = useGrantUserPermModalContext();
  const { users, handleLoadUsers } = useUserListTableContext();

  const handleSubmit = async () => {
    try {
      const success = await handleUpdateUserPermissionsAsync();
      console.log('wow' + success);
      if (success) {
        handleLoadUsers();
        handleCloseModal();
      }
    } catch {
      return;
    }
  };

  return (
    <Modal
      width={600}
      title="Grant User Permissions"
      open={modalVisible}
      onCancel={handleCloseModal}
      maskClosable
      onOk={handleSubmit}
      okButtonProps={{ loading: updateUserPermissionsAsync.isPending }}
    >
      <Form form={form} labelCol={{ span: 6 }} labelAlign="left">
        <Form.Item
          name="userID"
          label="User ID"
          required
          rules={[{ required: true }]}
        >
          <UserSelector placeholder="Select a User" userIDAsValue />
        </Form.Item>
        <Form.Item
          name="permissionIDs"
          label="Permissions"
          dependencies={['userID']}
          required
          rules={[
            { required: true },
            {
              validator: (_, permissions: string[]) => {
                if (!permissions) return Promise.resolve();

                const user = users.find(
                  (item) => item.userID === form.getFieldValue('userID')
                );

                const selectedPermNames = permissions.map(
                  (permission) =>
                    permission.split(PERMISSION_ID_NAME_SEPARATOR)[1]
                );

                if (user?.permissions) {
                  for (const perm of user.permissions) {
                    if (selectedPermNames.includes(perm)) {
                      return Promise.reject(
                        `User already has permission '${perm}'. Kindly check again`
                      );
                    }
                  }
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <PermissionSelector mode="multiple" includePermissionName />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GrantUserPermissionsModal;
