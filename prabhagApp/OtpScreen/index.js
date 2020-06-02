import React from "react";
import { View } from "react-native";
import OtpBoxes from './OtpBoxes'


function OtpScreen(){
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <OtpBoxes 
                sentOn="9764376462"
                resendOtp={() => console.log('hehehe')}
                checkOtp={value => console.log('value is', value)}
            />
        </View>
    )
}

export default OtpScreen