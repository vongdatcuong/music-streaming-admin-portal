import React from 'react';

import { Select, SelectProps } from 'antd';

import { LanguageEnum, LanguageEnumMap } from '../../constants/language';
import { makeOptionsFromDictionary } from '../../utils/enum';

const LanguageSelector: React.FC<SelectProps> = (props) => {
  return (
    <Select
      options={makeOptionsFromDictionary(LanguageEnum, {
        enumerationMap: LanguageEnumMap,
        exceptions: [LanguageEnum.UNKNOWN],
      })}
      placeholder="Select a language"
      showSearch
      {...props}
    />
  );
};

export default LanguageSelector;
