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

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from '../utils/injectSaga';
import injectReducer from '../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import { createStructuredSelectorCreator } from '../utils/commonFunctions';
import { getLoaderValue } from "./selectors";
import { updateUserProfile } from "./actions";
import Loader from '../utils/Loader';
import { styles } from './style';

import womenImg from '../assets/womenImg.png'
import menImg from '../assets/menImg.png'

const EDITABLE_FIELDS_STRUCTURE = {
    "Gender":false,
    "Address":false,
    "bloodgroup":false,
    "mobileno":false,
    "name":false,
    "occupation":false,
}

function Profile({
    getLoaderValue,
    updateUserProfile,
}){
    const [userData , setUserData] = useState(null)
    const [editableFields, setEditableFields] = useState({...EDITABLE_FIELDS_STRUCTURE})
    const [copyOfUserData, setCopyOfUserData] = useState({})

    useEffect(() => {
        async function fetchData() {
            const data = await getLoginDetails()
            const parsedData = JSON.parse(data)
            parsedData.Address = "KEY_NOT_AVAILABLE Please add Address key"
            setUserData(parsedData)
            setCopyOfUserData(parsedData)
        }
        fetchData();
      }, []);

    if(getLoaderValue || !userData){
        return (
            <Loader isLoading={getLoaderValue} />
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
            Address, 
            bloodgroup,
            mobileno,
            name,
            occupation
        }  = editableFields 
        if(Gender || Address || bloodgroup || mobileno || name || occupation){
            return true
        }
        return false
    }

    function onUpdateButtonPressed(){
        updateUserProfile(userData)
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
                            value={String(userData.mobileno)}
                            onChangeText={(value) => onTextInputChange(value,'mobileno')}
                            maxLength={10}
                            keyboardType={'phone-pad'}
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
                            editableFields.Address
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
                            editable={editableFields.Address}
                            value={userData.Address}
                            onChangeText={(value) => onTextInputChange(value,'Address')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editAddIcon}>
                        <Entypo 
                            name={editableFields.Address ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('Address')}
                        />
                    </TouchableOpacity>
                </View>
                {
                    showButton() &&
                    <View style={styles.buttonView}>
                        <TouchableOpacity 
                            style={styles.buttonTouchableOpacity}
                            onPress={onUpdateButtonPressed}
                        >
                            <Text style={styles.buttonText}>UPDATE</Text>
                        </TouchableOpacity>
                    </View>
                }
           </ScrollView>
        </SafeAreaView>
    )
}


const mapStateToProps = createStructuredSelectorCreator({
    getLoaderValue
});
  
const mapDispatchToProps = {
    updateUserProfile,
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
const withReducer = injectReducer({ key: 'profileScreenKey', reducer });
const withSaga = injectSaga({ key: 'profileScreenKey', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Profile)  

