import React from 'react';
import MainApp from "./MainApp";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const initialState = {};
const store = configureStore(initialState);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </Provider>
  );
}

export default App