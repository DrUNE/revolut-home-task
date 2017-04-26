import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import 'theme';
import { Provider } from 'react-redux';
import initStore from './store'

const store = initStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
