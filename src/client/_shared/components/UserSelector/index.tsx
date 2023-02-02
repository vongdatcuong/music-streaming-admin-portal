import React from 'react';

import { Select, SelectProps, Spin } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { debounce } from 'lodash';

import { useAsync } from '../../hooks/useAsync';
import { getUserListAutocomplete } from '../../services/user';
import { User } from '../../types/user/Model';

interface Props extends SelectProps {
  debounceTimeout?: number;
  userIDAsValue?: boolean;
}

const UserSelector: React.FC<Props> = ({
  debounceTimeout = 400,
  userIDAsValue = false,
  style,
  ...restProps
}) => {
  const getUserListAutocompleteAsync = useAsync(getUserListAutocomplete);
  // Use explicit namespaces state so that we can empty the option list when users empty the input
  const [users, setUsers] = React.useState<User[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFetcher = React.useCallback(
    debounce(async (search: string) => {
      if (!search) {
        setUsers([]);
        return;
      }

      const { data, success } = await getUserListAutocompleteAsync.execute({
        filter: {
          email: search,
        },
      });

      if (success) {
        setUsers(data?.users || []);
      }
    }, debounceTimeout),
    []
  );

  return (
    <Select
      showSearch
      options={
        (!getUserListAutocompleteAsync.isPending
          ? users?.map((user) => ({
              label: user.email || '',
              value: (userIDAsValue ? user.user_id : user.email) || '',
            }))
          : []) as DefaultOptionType[]
      }
      onSearch={debounceFetcher}
      style={{ minWidth: 150, ...style }}
      placeholder="Select a User"
      notFoundContent={
        getUserListAutocompleteAsync.isPending ? (
          <Spin size="small" />
        ) : (
          'Type more to see results'
        )
      }
      filterOption={false}
      dropdownMatchSelectWidth={false}
      {...restProps}
    />
  );
};

export default UserSelector;
