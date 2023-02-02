import React from 'react';

import { Form, message } from 'antd';

import { useAsync } from 'src/client/_shared/hooks/useAsync';
import { updateUserPermissions } from 'src/client/_shared/services/user';

import { transformGrantUserPermModalToAPIParams } from '../transformers';
import { GrantUserPermissionFormVM } from '../types/ViewModel';

export const useGrantUserPermissionModal = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [form] = Form.useForm<GrantUserPermissionFormVM>();
  const updateUserPermissionsAsync = useAsync(updateUserPermissions);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setModalVisible(false);
  };

  const handleUpdateUserPermissionsAsync = async () => {
    try {
      const values = await form.validateFields();

      const { success } = await updateUserPermissionsAsync.execute(
        transformGrantUserPermModalToAPIParams(values)
      );

      if (success) {
        message.success('Update user permissions successfully');
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    modalVisible,
    handleOpenModal,
    handleCloseModal,
    form,
    handleUpdateUserPermissionsAsync,
    updateUserPermissionsAsync,
  };
};
