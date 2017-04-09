/* @flow */
import React, { Element } from 'react';
import classNames from 'classnames';

import styles from './styles.css';

type Props = {
  name: string,
  style: string,
};

const SimpleLineIcon = (props: Props): Element<any> => {
  const { name, style, ...otherProps } = props;
  return <i className={classNames(styles[`icon-${name}`], style)} {...otherProps} />;
};

export default SimpleLineIcon;
