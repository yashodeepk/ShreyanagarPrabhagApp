import React from "react";
import { 
    View,
    Text,
    Button,
} from "react-native";
import { styles } from "./style";

function Login({navigation}){
    return (
        <View style={styles.container}>
            <Text>go to search screen</Text>
            <Button title="heh" onPress={() => navigation.navigate('Home')}/>
        </View>
    )
}

export default Login