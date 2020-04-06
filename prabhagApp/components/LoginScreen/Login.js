import React from "react";
import { View,Text,Button } from "react-native";

function Login({navigation}){
    return (
        <View>
            <Text>go to search screen</Text>
            <Button title="heh" onPress={() => navigation.navigate('Home')}/>
        </View>
    )
}

export default Login