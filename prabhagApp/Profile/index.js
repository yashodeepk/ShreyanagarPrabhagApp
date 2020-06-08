import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 Image,
 TextInput,
 ScrollView,
} from "react-native";
import { getLoginDetails } from "../utils/asyncStorage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from 'react-native-vector-icons';
import womenImg from '../assets/womenImg.png'
import menImg from '../assets/menImg.png'

// edit
// cross
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
            <View style={styles.alignItemsCenter}>
                <Image
                    style={styles.userImage}
                    source={
                        userData.Gender === "Male"
                        ? menImg
                        : womenImg
                    }
                />
            </View>
           <ScrollView>
                <View style={styles.flexDirRow}>
                    <View style={styles.detailBox}>
                        <Text style={styles.textStyle}>
                            Name - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={true}
                            defaultValue={userData.name}
                        />
                    </View>
                    <View style={styles.editIcon}>
                        <Entypo 
                            name="edit"
                            color={"#000"}
                            size={30}
                        />
                    </View>
                </View>
                <View style={styles.flexDirRow}>
                    <View style={styles.detailBox}>
                        <Text style={styles.textStyle}>
                            Mobile No - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={false}
                            defaultValue={userData.name}
                        />
                    </View>
                    <View style={styles.editIcon}>
                        <Entypo 
                            name="edit"
                            color={"#000"}
                            size={30}
                        />
                    </View>
                </View>
                <View style={styles.flexDirRow}>
                    <View style={styles.detailBox}>
                        <Text style={styles.textStyle}>
                            BloodGroup - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={false}
                            defaultValue={userData.name}
                        />
                    </View>
                    <View style={styles.editIcon}>
                        <Entypo 
                            name="edit"
                            color={"#000"}
                            size={30}
                        />
                    </View>
                </View>
                <View style={styles.flexDirRow}>
                    <View style={styles.detailBox}>
                        <Text style={styles.textStyle}>
                            Occupation - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={false}
                            defaultValue={userData.name}
                        />
                    </View>
                    <View style={styles.editIcon}>
                        <Entypo 
                            name="edit"
                            color={"#000"}
                            size={30}
                        />
                    </View>
                </View>
                <View style={styles.flexDirRow}>
                    <View style={styles.detailAddBox}>
                        <Text style={styles.textStyle}>
                            Address - 
                        </Text>
                        <TextInput 
                            style={styles.textInputForAddress}
                            multiline={true}
                            numberOfLines={4}
                            editable={true}
                        />
                    </View>
                    <View style={styles.editAddIcon}>
                        <Entypo 
                            name="edit"
                            color={"#000"}
                            size={30}
                        />
                    </View>
                </View>
           </ScrollView>
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
    },
    detailAddBox: {
        height:100,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#eee',
        margin:10,
        borderRadius:5,
        flex: 0.9,
        flexDirection:'row',
        padding:10,
    },
    editAddIcon: {
        height:100,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        flex:0.1,
    },
    detailBox : {
        height:55,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#eee',
        margin:10,
        borderRadius:5,
        alignItems:'center',
        flex: 0.9,
        flexDirection:'row',
        padding:10,
    },
    editIcon: {
        height:55,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        flex:0.1,
    },
    textStyle : {
        fontWeight:'bold',
        fontSize:16,
    },
    alignItemsCenter: {
        alignItems:'center'
    },
    flexDirColumn :{ 
        flexDirection:'column',
    },
    flexDirRow:{
        flexDirection:'row',
    },
    textInputStyle:{
        fontSize:16,
        flex:1,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:2,
    },
    textInputForAddress:{
        fontSize:16,
        paddingLeft:5,
        flex:1,
        textAlignVertical:'top',
        paddingLeft:5,
        paddingTop:2,
    },
})

export default Profile