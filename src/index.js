/* @flow */
import 'babel-polyfill';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import stores from 'src/stores/';

import Root from 'src/containers/Root';
import keys from 'src/config/keys';
import 'src/styles/globals.css';

// Renders the application (inside the div that has the id #root)
const mountNode = document.querySelector('#root');

// Mount the app in the mount note
ReactDOM.render(
  <AppContainer>
    <Root stores={stores} />
  </AppContainer>,
  mountNode
);

if (keys.IS_ENV_DEVELOPMENT && module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot stores={stores} />
      </AppContainer>,
      mountNode
    );
  });
}
