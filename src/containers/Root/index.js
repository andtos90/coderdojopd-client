/* @flow */
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppScreen from 'src/containers/App';
import MainScreen from 'src/containers/Main';

type Props = {|
  stores: Object,
|};

class Root extends Component<void, Props, void> {
  render() {
    const { stores } = this.props;

    return (
      <Router>
        <Provider {...stores}>
          <AppScreen>
            <Route path={'/'} component={MainScreen} />
          </AppScreen>
        </Provider>
      </Router>
    );
  }
}

export default Root;
