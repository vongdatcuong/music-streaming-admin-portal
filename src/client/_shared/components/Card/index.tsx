import React from 'react';

import { Card as AntdCard } from 'antd';
import { CardProps } from 'antd/lib/card';
import cx from 'classnames';

import styles from './s.module.scss';

const Card: React.FC<CardProps> = (props: CardProps) => {
  const title =
    typeof props.title === 'string' ? (
      <h2 className={styles.cardTitle}>{props.title}</h2>
    ) : (
      props.title
    );
  return (
    <AntdCard
      {...props}
      className={cx(styles.pageCard, props.className)}
      title={title}
    />
  );
};

export default Card;
