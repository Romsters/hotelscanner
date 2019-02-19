import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
import Shell from './components/shell';
import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Provider store={store}>
          <Shell />
        </Provider>
      </AppContainer>
    );
  }
}

export default App;
