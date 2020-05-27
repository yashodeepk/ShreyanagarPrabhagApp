import React , { useEffect } from 'react';
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
import { 
  getLoginDetails 
} from "../utils/asyncStorage";
import { 
  setUserDetails,
} from "./actions";

const LoginStack = createStackNavigator();

const MainStack = createBottomTabNavigator();

function MainApp({
  userLoggedIn,
  setUserDetails,
}){
  useEffect(() => {
    async function getUserDetailFromAsyncStore() {
      try {
        const response = await getLoginDetails();
        setUserDetails(response) 
      } catch (error) {
        setUserDetails(null) 
      }
    }
    getUserDetailFromAsyncStore();
  },[])
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
  setUserDetails,
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
