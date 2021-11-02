import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { configureFakeAPI, store } from './helpers';

configureFakeAPI();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
