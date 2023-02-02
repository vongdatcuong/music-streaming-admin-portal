import React from 'react';

import { Form, message } from 'antd';

import { useAsync } from 'src/client/_shared/hooks/useAsync';
import {
  createSong,
  putSong,
  uploadSong,
} from 'src/client/_shared/services/song';
import { SongVM } from 'src/client/_shared/types/song/ViewModel';
import { getAudioFileDuration } from 'src/client/_shared/utils/file';

import {
  transformCreateSongFormVMToAPIParams,
  transformEditSongFormVMToAPIParams,
  transformSongVMToFormVM,
} from '../transformers';
import { CreateEditSongFormVM } from '../types/ViewModel';

export const useCreateEditSongModal = () => {
  const uploadSongAsync = useAsync(uploadSong);
  const createSongAsync = useAsync(createSong);
  const putSongAsync = useAsync(putSong);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [form] = Form.useForm<CreateEditSongFormVM>();
  const [modalData, setModalData] = React.useState<SongVM>();
  const isEditing = !!modalData;

  const handleOpenModal = (data?: SongVM) => {
    if (data) {
      form.setFieldsValue(transformSongVMToFormVM(data));
    }

    setModalData(data);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalData(undefined);
    form.resetFields();
  };

  const handleCreateUpdateSong = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing) {
        // Update
        const res = await putSongAsync.execute({
          song: {
            ...modalData?.raw,
            ...transformEditSongFormVMToAPIParams(values),
          },
        });

        if (res.success) {
          message.success('Update song successfully');
          return true;
        }
      } else {
        // Create
        // Upload file
        const uploadRes = await uploadSongAsync.execute({ file: values.file });

        if (
          uploadRes.success &&
          uploadRes.data?.resource_id &&
          uploadRes.data?.resource_link
        ) {
          const { resource_id, resource_link } = uploadRes.data ?? {};
          const res = await createSongAsync.execute({
            song: {
              ...transformCreateSongFormVMToAPIParams(values),
              duration: await getAudioFileDuration(
                values.file as unknown as MediaSource
              ),
              resource_id,
              resource_link,
            },
          });

          if (res.success) {
            message.success('Create song successfully');
            return true;
          }
        }
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
    handleCreateUpdateSong,
    isEditing,
    modalData,
    isPending:
      uploadSongAsync.isPending ||
      createSongAsync.isPending ||
      putSongAsync.isPending,
  };
};
