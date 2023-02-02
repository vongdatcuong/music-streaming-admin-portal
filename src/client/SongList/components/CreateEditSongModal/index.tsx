import React from 'react';

import { Form, Input, Modal } from 'antd';

import GenreSelector from 'src/client/_shared/components/GenreSelector';
import LanguageSelector from 'src/client/_shared/components/LanguageSelector';
import ViewOnlyInput from 'src/client/_shared/components/ViewOnlyInput';

import {
  useCreateEditSongModalContext,
  useSongListTableContext,
} from '../../context';
import SongUploader from '../SongUploader';

const CreateEditSongModal: React.FC = () => {
  const {
    modalVisible,
    form,
    handleCloseModal,
    handleCreateUpdateSong,
    isEditing,
    isPending,
  } = useCreateEditSongModalContext();
  const { songList } = useSongListTableContext();

  const handleSubmit = async () => {
    try {
      const success = await handleCreateUpdateSong();
      if (success) {
        songList.refreshTable();
        handleCloseModal();
      }
    } catch {
      return;
    }
  };

  return (
    <Modal
      width={600}
      title={`${isEditing ? 'Edit' : 'Create'} Song`}
      open={modalVisible}
      onCancel={handleCloseModal}
      maskClosable
      onOk={handleSubmit}
      okButtonProps={{ loading: isPending }}
    >
      <Form form={form} labelCol={{ span: 6 }} labelAlign="left">
        {isEditing && (
          <Form.Item name="songID" label="Song ID">
            <ViewOnlyInput />
          </Form.Item>
        )}
        <Form.Item
          name="name"
          label="Name"
          required
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Input" />
        </Form.Item>
        <Form.Item
          name="genre"
          label="Genre"
          required
          rules={[
            {
              required: true,
            },
          ]}
        >
          <GenreSelector />
        </Form.Item>
        <Form.Item
          name="language"
          label="Language"
          required
          rules={[{ required: true }]}
        >
          <LanguageSelector />
        </Form.Item>
        <Form.Item
          name="artist"
          label="Artist"
          required
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Input" />
        </Form.Item>
        {!isEditing && (
          <Form.Item
            name="file"
            label="File"
            required
            rules={[
              {
                required: true,
              },
            ]}
          >
            <SongUploader />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CreateEditSongModal;
