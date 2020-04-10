import React from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import injectSaga from "../utils/injectSaga";
import saga from './saga';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from "../main/main";
import Login from "../LoginScreen/index";
import {
  fetchLoggedInUserData,
} from './selectors';

const MainStack = createStackNavigator();

const LoginStack = createStackNavigator();

function MainApp({
  userLoggedIn,
}){
  console.log(' userLoggedIn is ', userLoggedIn)
    return (
      <NavigationContainer>
      {
        userLoggedIn 
        ? (
          <MainStack.Navigator headerMode="screen">
            <MainStack.Screen 
                name="Home" 
                component={Main} 
                options={{headerShown: false}}
            />
          </MainStack.Navigator>
        )
        : (
           <LoginStack.Navigator>
              <LoginStack.Screen 
                name="LoginApp"
                component={Login}
                options={{headerShown: false}}
              />
          </LoginStack.Navigator>
        )
      }
      </NavigationContainer>
    )
}


const mapStateToProps = createStructuredSelector({
  userLoggedIn : fetchLoggedInUserData()
});

const mapDispatchToProps = {
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withSaga,
  withConnect,
)(MainApp);
