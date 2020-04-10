import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  createStructuredSelectorCreator,
} from '../utils/commonFunctions';
import injectSaga from '../utils/injectSaga';
import injectReducer from '../utils/injectReducer';
import Loader from '../utils/Loader';
import reducer from './reducer';
import saga from './saga';
import GradientButton from "../utils/GradientButton";
import flagImage from "../assets/Flag_of_India.png";
import { 
  setMobileNumber,
  loginAction
} from "./actions";
import { 
  getMobileNumber,
  loginStatusCallLoader,
} from './selectors';

function Login({ 
  navigation,
  setMobileNumber,
  mobileNumber,
  loginAction,
}) {

  function sendLoginAction(){
    console.log('hehhehe 12312312312 sendLoginAction')
    loginAction(navigation)
  }
  
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <View style={styles.centerView}>
            <View style={styles.imgView}>
                <Image 
                  source={flagImage}
                  resizeMode="center"
                  style={{
                    width:20,
                    height:20,
                  }}
                />
                <Text style={styles.textStyle}>+91</Text>
            </View>
            <View style={styles.inputTextView}>
              <TextInput
                  onChangeText={text => setMobileNumber(text)}
                  keyboardType="numeric"
                  maxLength={10}
              />
            </View>
        </View>
          {
             mobileNumber.length === 10 && (
                <View style={styles.buttonStyle}>
                  <GradientButton 
                    title="Login" 
                    onPress={sendLoginAction} 
                  />
                </View>
              )
           }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex:{
    flex:1,
  },
  centerView:{
    width: '90%',
    borderColor: 'black',
    borderWidth:1,
    borderRadius:10,
    height: 70,
    padding:10,
    flexDirection:'row'
  },
  textStyle:{
    fontSize:14,
    color:'#0A0B09',
    textAlignVertical:'center',
  },
  imgView:{
    flex:0,
    margin:10,
    flexDirection:'row',
    justifyContent:"space-evenly",
    alignItems:'center',
    width:60,
    borderRightColor:'black',
    borderRightWidth:1,
  },
  inputTextView:{
    flex: 1,
    padding:10,
    textAlign:'center'
  },
  buttonStyle:{
      position:'absolute',
      bottom:150,
      right: 20,
  }
});

const mapStateToProps = createStructuredSelectorCreator({
  mobileNumber: getMobileNumber,
  loginStatusCallLoader,
});

const mapDispatchToProps = {
  setMobileNumber,
  loginAction,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
