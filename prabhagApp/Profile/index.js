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
    fetchUpdateButtonStatus,
} from "./selectors";
import { 
    updateUserProfile,
    getFamilyData,
    setFamilyData,
    setEditedFamilyData,
    showUpdateButton,
} from "./actions";
import Loader from '../utils/Loader';
import { styles } from './style';
import profileImg from "../assets/propic.png";


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

    function onUpdateButtonPressed(){
        updateUserProfile(fetchFamilyData)
    }

    const renderItem = ({ item , index}) => {
        return (
            <>
            <View style={[styles.marginVertical10,styles.flexDirRow,styles.flexOne,styles.center]}>
                <Text style={styles.textCenter}>
                    {`Profile Details of `}
                </Text>
                <Text style={[styles.textCenter,styles.profileHeadingName]}>
                    {item.name}
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
                            editableArray.toJS()[index][`mobileno`]
                                ? styles.detailBoxEditable 
                                : styles.detailBoxNotEditable
                            }
                >
                    <Text style={styles.textStyle}>
                        Mobile No - 
                    </Text>
                    <TextInput 
                        style={styles.textInputStyle}
                        editable={editableArray.toJS()[index][`mobileno`]}
                        value={String(item.mobileno)}
                        onChangeText={(value) => onTextInputChange({ value,key :'mobileno',index})}
                        maxLength={10}
                        keyboardType={'phone-pad'}
                    />
                </View>
                <TouchableOpacity style={styles.editIcon}>
                    <Entypo 
                        name={ editableArray.toJS()[index][`mobileno`] ? 'cross' : "edit"}
                        color={"#000"}
                        size={30}
                        onPress={() => onEdit({index,key:'mobileno'})}
                    />
                </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                editableArray.toJS()[index][`bloodgroup`]
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            BloodGroup - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableArray.toJS()[index][`bloodgroup`]}
                            value={item.bloodgroup}
                            onChangeText={(value) => onTextInputChange({ value,key :'bloodgroup',index})}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                             name={editableArray.toJS()[index][`bloodgroup`] ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit({index,key:'bloodgroup'})}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                editableArray.toJS()[index][`email`] 
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            Email - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableArray.toJS()[index][`email`]}
                            value={item.email}
                            onChangeText={(value) => onTextInputChange({value,key:'email',index})}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                            name={editableArray.toJS()[index][`email`] ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit({index,key:'email'})}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={
                                editableArray.toJS()[index][`education`] 
                                    ? styles.detailBoxEditable 
                                    : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            Education - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableArray.toJS()[index][`education`]}
                            value={item.education}
                            onChangeText={(value) => onTextInputChange({value,key:'education',index})}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                            name={editableArray.toJS()[index][`education`] ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit({index,key:'education'})}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={
                                editableArray.toJS()[index][`businessjob`] 
                                    ? styles.detailBoxEditable 
                                    : styles.detailBoxNotEditable
                            }
                    >
                        <Text style={styles.textStyle}>
                            Business/Job - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableArray.toJS()[index][`businessjob`]}
                            value={item.businessjob}
                            onChangeText={(value) => onTextInputChange({value,key:'businessjob',index})}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                            name={editableArray.toJS()[index][`businessjob`] ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit({index,key:'businessjob'})}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirRow}>
                    <View 
                        style={ 
                                editableArray.toJS()[index][`dob`]
                                    ? styles.detailBoxEditable 
                                    : styles.detailBoxNotEditable
                              }
                    >
                        <Text style={styles.textStyle}>
                            DOB - 
                        </Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            editable={editableArray.toJS()[index][`dob`]}
                            value={item.dob}
                            onChangeText={(value) => onTextInputChange({value,key:'dob',index})}
                        />
                    </View>
                    <TouchableOpacity style={styles.editIcon}>
                        <Entypo 
                            name={editableArray.toJS()[index][`dob`] ? 'cross' : "edit"}
                            color={"#000"}
                            size={30}
                            onPress={() => onEdit({key:'dob',index})}
                        />
                    </TouchableOpacity>
                </View>
                    <View style={styles.flexDirRow}>
                        <View 
                            style={
                                    editableArray.toJS()[index][`dom`]
                                        ? styles.detailBoxEditable 
                                        : styles.detailBoxNotEditable
                                }
                        >
                            <Text style={styles.textStyle}>
                                DOM - 
                            </Text>
                            <TextInput 
                                style={styles.textInputStyle}
                                editable={editableArray.toJS()[index][`dom`]}
                                value={item.dom}
                                onChangeText={(value) => onTextInputChange({value,key:'dom',index})}
                            />
                        </View>
                        <TouchableOpacity style={styles.editIcon}>
                            <Entypo 
                                name={editableArray.toJS()[index][`dom`] ? 'cross' : "edit"}
                                color={"#000"}
                                size={30}
                                onPress={() => onEdit({index,key:'dom'})}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flexDirRow}>
                        <View 
                            style={
                                editableArray.toJS()[index][`address`]
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
                                editable={editableArray.toJS()[index][`address`]}
                                value={item.address}
                                onChangeText={(value) => onTextInputChange({value,key:'address',index})}
                            />
                        </View>
                        <TouchableOpacity style={styles.editAddIcon}>
                            <Entypo 
                                name={editableArray.toJS()[index][`address`] ? 'cross' : "edit"}
                                color={"#000"}
                                size={30}
                                onPress={() => onEdit({key:'address',index})}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flexDirRow}>
                        <View 
                            style={
                                editableArray.toJS()[index][`businessaddress`] 
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
                                editable={editableArray.toJS()[index][`businessaddress`]}
                                value={item.businessaddress}
                                onChangeText={(value) => onTextInputChange({value,key:'businessaddress',index})}
                            />
                        </View>
                        <TouchableOpacity style={styles.editAddIcon}>
                            <Entypo 
                                name={editableArray.toJS()[index][`businessaddress`] ? 'cross' : "edit"}
                                color={"#000"}
                                size={30}
                                onPress={() => onEdit({index,key:'businessaddress'})}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flexDirRow}>
                        <View 
                            style={ 
                                editableArray.toJS()[index][`businessbrief`]
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
                                editable={editableArray.toJS()[index][`businessbrief`]}
                                value={item.businessbrief}
                                onChangeText={(value) => onTextInputChange({value,key:'businessbrief',index})}
                            />
                        </View>
                        <TouchableOpacity style={styles.editAddIcon}>
                            <Entypo 
                                name={editableArray.toJS()[index][`businessbrief`] ? 'cross' : "edit"}
                                color={"#000"}
                                size={30}
                                onPress={() => onEdit({index,key:'businessbrief'})}
                            />
                        </TouchableOpacity>
                    </View>
            </>
        )
    }

    const renderFooterComponent = () =>  (
            <View style={styles.buttonView}>
                <TouchableOpacity 
                    style={styles.buttonTouchableOpacityActive}
                    onPress={onUpdateButtonPressed}
                >
                    <Text style={styles.buttonText}>UPDATE</Text>
                </TouchableOpacity>
            </View>
    )

    return (
        <SafeAreaView style={styles.flexOne}>
            <View style={styles.alignItemsCenter}>
                <Image
                    style={styles.userImage}
                    source={profileImg}
                />
            </View>
            <FlatList 
                data={fetchFamilyData.toJS()}
                renderItem={renderItem}
                extraData={[editableArray.toJS(),buttonStatus]}
                ListFooterComponent={renderFooterComponent}
            />
        </SafeAreaView>
    )
}


const mapStateToProps = createStructuredSelectorCreator({
    getLoaderValue,
    fetchFamilyData,
    fetchCopyFamilyData,
    editableArray : fetchEditedArrayStructure,
    buttonStatus : fetchUpdateButtonStatus,
});
  
const mapDispatchToProps = {
    updateUserProfile,
    getFamilyData,
    setFamilyData,
    setEditedFamilyData,
    showUpdateButton,
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

