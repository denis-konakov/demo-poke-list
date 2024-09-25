import React from 'react';
import store from './src/store/store';
import Main from 'src/Main';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
