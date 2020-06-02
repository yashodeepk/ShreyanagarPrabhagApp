import React from "react";
import { View } from "react-native";
import OtpBoxes from './OtpBoxes'
import { connect } from 'react-redux';
import { createStructuredSelectorCreator } from '../utils/commonFunctions';
import { 
    getMobileNumber,
    loginStatusCallLoader,
} from "../LoginScreen/selectors";
import { setLoginStatus } from "../LoginScreen/actions";
import { fetchVerificationId } from "../MainApp/selectors";
import { loginAction } from "../LoginScreen/actions";
import Loader from '../utils/Loader';
import firebase from "../utils/firebase";

function OtpScreen({
    navigation,
    mobileNumber,
    verificationId,
    loginAction,
    setLoginStatus,
    loginStatusCallLoader,
}){

    const onOtpCheck = async(arr) => {
        try {
            setLoginStatus(true)
            const otp = arr.join('')
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                otp
              );
            const authResult = await firebase.auth().signInWithCredential(credential);
            loginAction()
        } catch (error) {
            console.log('error in onOtpCheck ',error)
        }
    }
    
    if (loginStatusCallLoader) {
        return <Loader isLoading={loginStatusCallLoader} />;
    }

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <OtpBoxes 
                sentOn={mobileNumber}
                resendOtp={() => console.log('hehehe')}
                checkOtp={onOtpCheck}
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelectorCreator({
    mobileNumber: getMobileNumber,
    verificationId: fetchVerificationId,
    loginStatusCallLoader
});
  
const mapDispatchToProps = {
    loginAction,
    setLoginStatus,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OtpScreen)