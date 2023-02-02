import React, { useEffect, useState } from 'react';

import { Switch, SwitchProps } from 'antd';

import { useAsync } from '../../hooks/useAsync';

interface Props extends SwitchProps {
  defaultChecked?: boolean;
  handleToggle: (checked: boolean) => Promise<{ success: boolean }>;
}

const ToggleSwitch: React.FC<Props> = ({
  defaultChecked = false,
  handleToggle,
  ...restProps
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const { execute, isPending, isEmptyAndFetching } = useAsync(handleToggle);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleOnChange = async (checked: boolean) => {
    try {
      const { success } = (await execute(checked)) ?? {};

      if (success) {
        setChecked(checked);
      }
    } catch {
      return;
    }
  };

  return (
    <Switch
      loading={isEmptyAndFetching || isPending}
      checked={checked}
      onChange={handleOnChange}
      {...restProps}
    />
  );
};

export default ToggleSwitch;
