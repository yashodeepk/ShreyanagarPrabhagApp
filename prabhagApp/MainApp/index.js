import React , { useEffect, useState } from 'react';
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
  FontAwesome5,
  SimpleLineIcons,
} from 'react-native-vector-icons';
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
import Loader from '../utils/Loader';
import OtpScreen from "../OtpScreen/index";
import Profile from "../Profile/index";


const LoginStack = createStackNavigator();

const MainStack = createBottomTabNavigator();

function MainApp({
  userLoggedIn,
  setUserDetails,
}){
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    async function getUserDetailFromAsyncStore() {
      try {
        const response = await getLoginDetails();
        setUserDetails(JSON.parse(response)) 
      } catch (error) {
        setUserDetails(null)
      } finally{
        setLoading(false)
      }
    }
    getUserDetailFromAsyncStore();
  },[])

  if(loading){
    return <Loader isLoading={loading} />;
  }
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
                  headerShown: true,
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
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="search" color={color} size={size} />
                ),
              }}
            />
            <MainStack.Screen 
              name="User" 
              component={Profile} 
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="user" color={color} size={size} />
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
               <LoginStack.Screen 
                name="Otp"
                component={OtpScreen}
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
