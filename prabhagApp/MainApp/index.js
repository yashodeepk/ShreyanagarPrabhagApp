import React from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import injectSaga from "../utils/injectSaga";
import saga from './saga';
import { createStackNavigator } from '@react-navigation/stack';
import Main from "../main/main";
import Login from "../LoginScreen/index";
import {
  initAction,
} from './actions';

const MainStack = createStackNavigator();

function MainApp(){
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

const mapStateToProps = createStructuredSelector({
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
