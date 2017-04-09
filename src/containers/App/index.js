/* @flow */
import React, { Component } from 'react';
import DevTool, { configureDevtool } from 'mobx-react-devtools';

import styles from './styles.css';

configureDevtool({
  logEnabled: true,
  updatesEnabled: true,
});

type Props = {|
  children?: any,
|};

type State = {};

export default class App extends Component<void, Props, State> {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps: Props) {}

  render() {
    const { children } = this.props;
    if (false) {
      return <div className={styles.container}><DevTool /></div>;
    } else {
      return (
        <div className={styles.container}>
          <DevTool />
          <div className={styles.content}>
            {children}
          </div>
        </div>
      );
    }
  }
}
