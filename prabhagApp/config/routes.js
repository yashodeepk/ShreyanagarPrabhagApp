import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from "../main/main";
import Login from "../LoginScreen/Login";

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