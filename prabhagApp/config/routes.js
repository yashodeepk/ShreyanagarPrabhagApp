import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from "../components/main/main";
import Login from "../components/LoginScreen/Login";

const MainStack = createStackNavigator();

function Routes(){
    return (
            <MainStack.Navigator 
                initialRouteName="Login"
                headerMode="screen"
            >
                <MainStack.Screen 
                    name="Login" 
                    component={Login}
                    options={{headerShown: false}}
                />
                <MainStack.Screen 
                    name="Home" 
                    component={Main} 
                />
            </MainStack.Navigator>
    )
}

export default Routes