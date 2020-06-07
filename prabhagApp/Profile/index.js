import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 Image,
} from "react-native";
import { getLoginDetails } from "../utils/asyncStorage";
import { SafeAreaView } from 'react-native-safe-area-context';
import womenImg from '../assets/womenImg.png'
import menImg from '../assets/menImg.png'

function Profile(){
    const [userData , setUserData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const data = await getLoginDetails()
            setUserData(JSON.parse(data))
        }
        fetchData();
      }, []);

    if(!userData){
        return (
            <View style={styles.center}>
                <Text>Loading</Text>    
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.flexOne}>
            <View style={{flex:1,alignItems:'center'}}>
                <Image
                    style={styles.userImage}
                    source={
                        userData.Gender === "Male"
                        ? menImg
                        : womenImg
                    }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexOne:{
        flex:1,
        backgroundColor:'#fff'
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    userImage : {
        margin:10,
        height: 100, 
        width: 100, 
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor:'black',
    }
})

export default Profile