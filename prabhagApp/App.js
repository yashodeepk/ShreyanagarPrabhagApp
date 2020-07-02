import React , { useState } from 'react';
import MainApp from "./MainApp";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const initialState = {};
const store = configureStore(initialState);

const fetchFonts = () => {
  return Font.loadAsync({
    'Rubik-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Rubik-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    });
};

function App() {
  const [fontLoading, setFontLoading] = useState(true)
  
  if(fontLoading){
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setFontLoading(false)}
      />
    )
  }

  return (
    <Provider store={store}>
        <MainApp />
    </Provider>
  );
}

export default App