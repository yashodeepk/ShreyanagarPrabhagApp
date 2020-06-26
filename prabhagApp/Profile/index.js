import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 Image,
 TextInput,
 ScrollView,
 TouchableOpacity,
 FlatList,
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
import { 
    getLoaderValue,
    fetchFamilyData,
    fetchCopyFamilyData,
    fetchEditedArrayStructure,
} from "./selectors";
import { 
    updateUserProfile,
    getFamilyData,
    setFamilyData,
    setEditedFamilyData,
} from "./actions";
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
    fetchFamilyData,
    getFamilyData,
    fetchCopyFamilyData,
    editableArray,
    setFamilyData,
    setEditedFamilyData,
}){

    useEffect(() => {
        async function fetchData() {
            const data = await getLoginDetails()
            const parsedData = JSON.parse(data)
            getFamilyData(parsedData.familycode)
        }
        fetchData();
      }, []);

    if(getLoaderValue){
        return (
            <Loader isLoading={getLoaderValue} />
        )
    }

    const onEdit = ({index,key}) => {
        const copy = deepCopy(editableArray)
        const copyFamilyData = deepCopy(fetchCopyFamilyData)
        const userData = deepCopy(fetchFamilyData)
        if(copy[index][key]){
            userData[index][key] = copyFamilyData[index][key]
            setFamilyData(userData)
        }
        copy[index][key] = !copy[index][key]
        setEditedFamilyData(copy)
    }

    const deepCopy = (data) => {
        return JSON.parse(JSON.stringify(data))
    }

    const onTextInputChange = ({value,key,index}) => { 
        const copyData = deepCopy(fetchFamilyData)
        copyData[index][`${key}`] = value
        setFamilyData(copyData)
    }

    const showButton = () => {
    }

    function onUpdateButtonPressed(){
        // updateUserProfile(userData)
    }

    const renderItem = ({ item , index}) => {
        return (
            <>
            <View style={styles.marginVertical10}>
                <Text style={styles.textCenter}>
                    {`Profile Details of ${item.name}`}
                </Text>
            </View>
            <View style={styles.flexDirRow}>
                <View 
                    style={ 
                        editableArray.toJS()[index][`name`] 
                                ? styles.detailBoxEditable 
                                : styles.detailBoxNotEditable
                        }
                >
                    <Text style={styles.textStyle}>
                        Name - 
                    </Text>
                    <TextInput 
                        style={styles.textInputStyle}
                        editable={editableArray.toJS()[index][`name`]}
                        value={item.name}
                        onChangeText={(value) => onTextInputChange({
                                value,
                                key : 'name',
                                index,
                            }
                        )}
                    />
                </View>
                <TouchableOpacity 
                    style={styles.editIcon}
                    onPress={() => onEdit({index,key:'name'})}
                >
                    <Entypo 
                        name={  
                            editableArray.toJS()[index][`name`] 
                                ? 'cross' 
                                : "edit"
                            }
                        color={"#000"}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.flexDirRow}>
                <View  
                    style={ 
                            item.mobileno 
                                    ? styles.detailBoxEditable 
                                    : styles.detailBoxNotEditable
                            }
                >
                    <Text style={styles.textStyle}>
                        Mobile No - 
                    </Text>
                    <TextInput 
                        style={styles.textInputStyle}
                        editable={!!item.mobileno}
                        value={String(item.mobileno)}
                        onChangeText={(value) => onTextInputChange(value,'mobileno')}
                        maxLength={10}
                        keyboardType={'phone-pad'}
                    />
                </View>
                <TouchableOpacity style={styles.editIcon}>
                    <Entypo 
                        name={item.mobileno ? 'cross' : "edit"}
                        color={"#000"}
                        size={30}
                        onPress={() => onEdit('mobileno')}
                    />
                </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                item.bloodgroup 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            BloodGroup - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={!!item.bloodgroup}
                            value={item.bloodgroup}
                            onChangeText={(value) => onTextInputChange(value,'bloodgroup')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                             name={item.bloodgroup ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('bloodgroup')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                item.bloodgroup 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            Email - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={!!item.bloodgroup}
                            value={fetchFamilyData.bloodgroup}
                            onChangeText={(value) => onTextInputChange(value,'bloodgroup')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                             name={item.bloodgroup ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('bloodgroup')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                item.education 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            Education - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={!!item.education}
                            value={item.education}
                            onChangeText={(value) => onTextInputChange(value,'education')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                             name={item.education ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('education')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                item.businessjob 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                            }
                    >
                        <Text style={styles.textStyle}>
                            Business/Job - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={!!item.businessjob}
                            value={item.businessjob}
                            onChangeText={(value) => onTextInputChange(value,'businessjob')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                            name={item.businessjob ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('businessjob')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                item.dob 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            DOB - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={!!item.dob}
                            value={item.dob}
                            onChangeText={(value) => onTextInputChange(value,'dob')}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                             name={item.dob ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit('dob')}
                        />
                    </TouchableOpacity>
                </View>
                    <View style={styles.flexDirRow}>
                        <View 
                            style={ 
                                    item.dom 
                                            ? styles.detailBoxEditable 
                                            : styles.detailBoxNotEditable
                                }
                        >
                            <Text style={styles.textStyle}>
                                DOM - 
                            </Text>
                            <TextInput 
                                style={styles.textInputStyle}
                                editable={!!item.dob}
                                value={item.dob}
                                onChangeText={(value) => onTextInputChange(value,'dob')}
                            />
                        </View>
                        <TouchableOpacity style={styles.editIcon}>
                            <Entypo 
                                name={item.dob ? 'cross' : "edit"}
                                color={"#000"}
                                size={30}
                                onPress={() => onEdit('dob')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flexDirRow}>
                        <View 
                            style={ 
                                item.Address
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
                                editable={!!item.address}
                                value={item.address}
                                onChangeText={(value) => onTextInputChange(value,'Address')}
                            />
                        </View>
                        <TouchableOpacity style={styles.editAddIcon}>
                            <Entypo 
                                name={item.Address ? 'cross' : "edit"}
                                color={"#000"}
                                size={30}
                                onPress={() => onEdit('Address')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flexDirRow}>
                        <View 
                            style={ 
                                item.businessaddress
                                ? styles.detailAddBoxEditable 
                                :  styles.detailAddBoxNotEditable
                            }
                        >
                            <Text style={styles.textStyle}>
                                Business Address - 
                            </Text>
                            <TextInput 
                                style={styles.textInputForAddress}
                                multiline={true}
                                numberOfLines={4}
                                editable={!!item.address}
                                value={item.address}
                                onChangeText={(value) => onTextInputChange(value,'businessaddress')}
                            />
                        </View>
                        <TouchableOpacity style={styles.editAddIcon}>
                            <Entypo 
                                name={item.businessaddress ? 'cross' : "edit"}
                                color={"#000"}
                                size={30}
                                onPress={() => onEdit('Address')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flexDirRow}>
                        <View 
                            style={ 
                                item.businessbrief
                                ? styles.detailAddBoxEditable 
                                :  styles.detailAddBoxNotEditable
                            }
                        >
                            <Text style={styles.textStyle}>
                                Business Brief - 
                            </Text>
                            <TextInput 
                                style={styles.textInputForAddress}
                                multiline={true}
                                numberOfLines={4}
                                editable={!!item.businessbrief}
                                value={item.businessbrief}
                                onChangeText={(value) => onTextInputChange(value,'businessbrief')}
                            />
                        </View>
                        <TouchableOpacity style={styles.editAddIcon}>
                            <Entypo 
                                name={item.businessbrief ? 'cross' : "edit"}
                                color={"#000"}
                                size={30}
                                onPress={() => onEdit('Address')}
                            />
                        </TouchableOpacity>
                    </View>
            </>
        )
    }

    return (
        <SafeAreaView style={styles.flexOne}>
            <View style={styles.alignItemsCenter}>
                <Image
                    style={styles.userImage}
                    source={
                        {}.Gender === "Male"
                        ? menImg
                        : womenImg
                    }
                />
            </View>
            <FlatList 
                data={fetchFamilyData.toJS()}
                renderItem={renderItem}
                extraData={editableArray.toJS()}
            />
            {/* {
                showButton() &&
                <View style={styles.buttonView}>
                    <TouchableOpacity 
                        style={styles.buttonTouchableOpacity}
                        onPress={onUpdateButtonPressed}
                    >
                        <Text style={styles.buttonText}>UPDATE</Text>
                    </TouchableOpacity>
                </View>
            } */}
        </SafeAreaView>
    )
}


const mapStateToProps = createStructuredSelectorCreator({
    getLoaderValue,
    fetchFamilyData,
    fetchCopyFamilyData,
    editableArray : fetchEditedArrayStructure,
});
  
const mapDispatchToProps = {
    updateUserProfile,
    getFamilyData,
    setFamilyData,
    setEditedFamilyData,
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

