import React from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import injectSaga from "../utils/injectSaga";
import saga from './saga';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  FontAwesome,
  FontAwesome5
} from 'react-native-vector-icons';
import * as firebase from 'firebase';
import Main from "../main/main";
import FeedScreen from "../FeedScreen";
import SearchScreen from "../SearchScreen";
import Login from "../LoginScreen/index";
import {
  fetchLoggedInUserData,
} from './selectors';

const firebaseConfig = {
  apiKey: "AIzaSyCrICHTXLCwOW18-4eHSdrVvVbxDbf38T4",
  authDomain: "todo-bca74.firebaseapp.com",
  databaseURL: "https://todo-bca74.firebaseio.com",
  projectId: "todo-bca74",
  storageBucket: "todo-bca74.appspot.com",
  messagingSenderId: "725269876596",
  appId: "1:725269876596:web:0a8167ee6b4cd4eba5a621",
  measurementId: "G-S8Z9G2GG5V"
};


const LoginStack = createStackNavigator();

const MainStack = createBottomTabNavigator();

function MainApp({
  userLoggedIn,
}){
    return (
      <NavigationContainer>
      {
        userLoggedIn
        ? (
          <MainStack.Navigator 
            initialRouteName="Feed"
            headerMode="screen"
            tabBarOptions={{
              activeTintColor: '#F7882F',
            }}
          >
            <MainStack.Screen 
                name="Feed" 
                component={FeedScreen} 
                options={{
                  headerShown: false,
                  tabBarLabel: 'Feed List',
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="list-alt" color={color} size={size} />
                  ),
                }}
            />
            <MainStack.Screen 
              name="Search" 
              component={SearchScreen} 
              options={{
                // headerShown: false,
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="search" color={color} size={size} />
                ),
              }}
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
