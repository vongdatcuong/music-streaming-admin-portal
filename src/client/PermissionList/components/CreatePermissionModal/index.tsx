import React from 'react';

import { Form, Input, Modal } from 'antd';

import {
  PERMISSION_PREFIX,
  PERMISSION_SEPARATOR,
} from 'src/client/_shared/constants';

import { ALPHABET_NUMBER_DOT_REGEX } from '../../constants';
import {
  useCreatePermissionModalContext,
  usePermissionListTableContext,
} from '../../context';

const CreatePermissionModal: React.FC = () => {
  const {
    modalVisible,
    form,
    handleCloseModal,
    handleCreatePermission,
    createPermissionAsync,
  } = useCreatePermissionModalContext();
  const { permissions, handleLoadPermissions } =
    usePermissionListTableContext();

  const handleSubmit = async () => {
    try {
      const success = await handleCreatePermission();
      if (success) {
        handleLoadPermissions();
        handleCloseModal();
      }
    } catch {
      return;
    }
  };

  return (
    <Modal
      width={600}
      title="Create Permission"
      open={modalVisible}
      onCancel={handleCloseModal}
      maskClosable
      onOk={handleSubmit}
      okButtonProps={{ loading: createPermissionAsync.isPending }}
    >
      <Form form={form} labelCol={{ span: 6 }} labelAlign="left">
        <Form.Item
          name="name"
          label="Name"
          required
          extra="Permission components are separated by dots"
          rules={[
            {
              required: true,
            },
            {
              validator: (_, value: string) => {
                if (!value) return Promise.resolve();

                if (!ALPHABET_NUMBER_DOT_REGEX.test(value)) {
                  return Promise.reject(
                    'Permission name must only contains alphabet letters, number or dot '
                  );
                }

                if (
                  value
                    .split(PERMISSION_SEPARATOR)
                    .some((permComponent) => !permComponent)
                ) {
                  return Promise.reject(
                    'No consecutive dots or trailing dots are allowed'
                  );
                }

                if (
                  permissions.some(
                    (permission) =>
                      permission.name === PERMISSION_PREFIX + value
                  )
                ) {
                  return Promise.reject(
                    'Permission exists. Kindly check again'
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            placeholder="Input"
            addonBefore={PERMISSION_PREFIX}
            autoFocus
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePermissionModal;
