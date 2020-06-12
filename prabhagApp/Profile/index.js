import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 Image,
 TextInput,
 ScrollView,
 TouchableOpacity,
} from "react-native";
import { getLoginDetails } from "../utils/asyncStorage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from 'react-native-vector-icons';
import womenImg from '../assets/womenImg.png'
import menImg from '../assets/menImg.png'

const EDITABLE_FIELDS_STRUCTURE = {
    "Gender":false,
    "address":false,
    "bloodgroup":false,
    "mobileno":false,
    "name":false,
    "occupation":false,
}

function Profile(){
    const [userData , setUserData] = useState(null)
    const [editableFields, setEditableFields] = useState({...EDITABLE_FIELDS_STRUCTURE})
    const [copyOfUserData, setCopyOfUserData] = useState({})

    useEffect(() => {
        async function fetchData() {
            const data = await getLoginDetails()
            const parsedData = JSON.parse(data)
            parsedData.address = "KEY_NOT_AVAILABLE Please add address key"
            setUserData(parsedData)
            setCopyOfUserData(parsedData)
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

    const onEdit = (key) => {
        const copy = {...editableFields}
        const copyForSettingOldValue = {...copyOfUserData}
        const copyValueIntoUserData = {...userData}
        copy[key] = !copy[key]
        copyValueIntoUserData[key] = copyForSettingOldValue[key]
        setEditableFields(copy)
        setUserData(copyValueIntoUserData)
    }

    const onTextInputChange = (value,key) => { 
        const copy = {...userData}
        copy[key] = value
        setUserData(copy)
    }

    const showButton = () => {
        const {
            Gender, 
            address, 
            bloodgroup,
            mobileno,
            name,
            occupation
        }  = editableFields 
        if(Gender || address || bloodgroup || mobileno || name || occupation){
            return true
        }
        return false
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
                    <View 
                        style={ 
                            editableFields.name 
                                    ? styles.detailBoxEditable 
                                    : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            Name - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableFields.name}
                            value={userData.name}
                            onChangeText={(value) => onTextInputChange(value,'name')}
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.editIcon}
                        onPress={() => onEdit('name')}
                    >
                        <Entypo 
                            name={editableFields.name ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View  
                        style={ 
                                editableFields.mobileno 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            Mobile No - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableFields.mobileno}
                            value={userData.mobileno}
                            onChangeText={(value) => onTextInputChange(value,'mobileno')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                            name={editableFields.mobileno ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('mobileno')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                editableFields.bloodgroup 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            BloodGroup - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableFields.bloodgroup}
                            value={userData.bloodgroup}
                            onChangeText={(value) => onTextInputChange(value,'bloodgroup')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                             name={editableFields.bloodgroup ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('bloodgroup')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                editableFields.occupation 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            Occupation - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableFields.occupation}
                            value={userData.occupation}
                            onChangeText={(value) => onTextInputChange(value,'occupation')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                             name={editableFields.occupation ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('occupation')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                editableFields.Gender 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            Gender - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableFields.Gender}
                            value={userData.Gender}
                            onChangeText={(value) => onTextInputChange(value,'Gender')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                             name={editableFields.Gender ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('Gender')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                            editableFields.address
                            ? styles.detailAddBoxEditable 
                            :  styles.detailAddBoxNotEditable
                        }
                    >
                        <Text style={styles.textStyle}>
                            Address - 
                        </Text>
                        <TextInput 
                            style={styles.textInputForAddress}
                            multiline={true}
                            numberOfLines={4}
                            editable={editableFields.address}
                            value={userData.address}
                            onChangeText={(value) => onTextInputChange(value,'address')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editAddIcon}>
                        <Entypo 
                            name={editableFields.address ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('address')}
                        />
                    </TouchableOpacity>
                </View>
                {
                    showButton() &&
                    <View style={styles.buttonView}>
                        <TouchableOpacity 
                            style={styles.buttonTouchableOpacity}
                        >
                            <Text style={styles.buttonText}>UPDATE</Text>
                        </TouchableOpacity>
                    </View>
                }
           </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    },
    buttonTouchableOpacity: {
        height: 65, 
        width : 150, 
        borderRadius: 10,
        elevation:1,
        backgroundColor:"#F7882F",
        justifyContent:'center',
        alignItems:'center',
    },
    buttonView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 25,
    },
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
    detailAddBoxNotEditable: {
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
    detailAddBoxEditable: {
        height:100,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#fff',
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
    detailBoxNotEditable : {
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
    detailBoxEditable : {
        height:55,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#fff',
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