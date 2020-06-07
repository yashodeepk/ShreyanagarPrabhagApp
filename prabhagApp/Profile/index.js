import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
} from "react-native";
import { getLoginDetails } from "../utils/asyncStorage";

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
        <View style={styles.center}>
            <Text>EDIT YOUR PROFILE</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
})

export default Profile