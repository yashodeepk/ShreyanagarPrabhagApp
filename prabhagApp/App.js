import React from 'react';
import Routes from "./config/routes";
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

export default App