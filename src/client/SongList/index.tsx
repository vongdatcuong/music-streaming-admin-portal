import React from 'react';

import { Button, Table } from 'antd';

import CreateEditSongModal from './components/CreateEditSongModal';
import { useSongListTableColumns } from './hooks/useSongListTableColumns';
import {
  CombinedSongListContext,
  useCreateEditSongModalContext,
  useSongListTableContext,
} from './context';
import Card from '../_shared/components/Card';
import PageHeader from '../_shared/components/PageHeader';
import PageWrapper from '../_shared/components/PageWrapper';
import { withContext } from '../_shared/utils/context';

const SongList: React.FC = () => {
  const { songList } = useSongListTableContext();
  const columns = useSongListTableColumns();
  const { handleOpenModal } = useCreateEditSongModalContext();

  return (
    <PageWrapper>
      <PageHeader title="Songs" />
      <Card title={`${songList.totalRef.current} items`}>
        <Table
          rowKey="songID"
          columns={columns}
          scroll={{ x: 'max-content' }}
          expandable={{
            expandedRowRender: (record) => (
              <audio controls>
                <source src={`http://127.0.0.1:8011/${record.resourceLink}`} />
              </audio>
            ),
            rowExpandable: (record) => !!record.resourceLink,
          }}
          title={() => (
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={() => handleOpenModal()}>
                Create Song
              </Button>
            </div>
          )}
          {...songList.tableProps}
        />
        <CreateEditSongModal />
      </Card>
    </PageWrapper>
  );
};

export default withContext(SongList, CombinedSongListContext);
