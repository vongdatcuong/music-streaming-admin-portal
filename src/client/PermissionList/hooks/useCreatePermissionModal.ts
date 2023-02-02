import React from 'react';

import { Form, message } from 'antd';

import { useAsync } from 'src/client/_shared/hooks/useAsync';
import { createPermission } from 'src/client/_shared/services/permission';

import { transformCreatePermissionFormVMToAPIParams } from '../transformers';
import { CreatePermissionFormVM } from '../types/ViewModel';

export const useCreatePermissionModal = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [form] = Form.useForm<CreatePermissionFormVM>();
  const createPermissionAsync = useAsync(createPermission);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleCreatePermission = async () => {
    try {
      const values = await form.validateFields();

      const { success } = await createPermissionAsync.execute({
        permission: transformCreatePermissionFormVMToAPIParams(values),
      });

      if (success) {
        message.success('Create new permission successfully');
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  return {
    modalVisible,
    handleOpenModal,
    handleCloseModal,
    form,
    handleCreatePermission,
    createPermissionAsync,
  };
};
