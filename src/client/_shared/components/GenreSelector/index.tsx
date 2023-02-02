import React from 'react';

import { Select, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';

import { useAsync } from '../../hooks/useAsync';
import { getGenreOptionsList } from '../../services/genre';

const GenreSelector: React.FC<SelectProps> = (props?) => {
  const listGenreOptions = useAsync(getGenreOptionsList, []);

  return (
    <Select
      options={
        (listGenreOptions.value?.data?.genres?.map((genre) => ({
          label: genre.name || '',
          value: genre.value || 0,
        })) || []) as DefaultOptionType[]
      }
      placeholder="Select a Genre"
      loading={listGenreOptions.isPending}
      optionFilterProp="label"
      {...props}
    />
  );
};

export default GenreSelector;
