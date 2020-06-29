import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  createStructuredSelectorCreator,
} from '../utils/commonFunctions';
import injectSaga from '../utils/injectSaga';
import injectReducer from '../utils/injectReducer';
import Loader from '../utils/Loader';
import reducer from './reducer';
import saga from './saga';
import { FlatList } from "react-native-gesture-handler";
import { DATA } from "./actions";
import {
  Entypo,
} from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { getLoginDetails } from "../utils/asyncStorage";


function FeedScreen({ 
  navigation,
}) {

  const [modalStatus , setModalStatus] = useState(false)
  const [feedText, setFeedText] = useState('')
  const [imageFromGallery,setImageFromGallery] = useState('')
  const [showPlusButton , setShowPlusButton] = useState(false)


  useEffect(() => {
    async function fetchData() {
        const data = await getLoginDetails()
        const { usertype } = JSON.parse(data)
        setShowPlusButton(usertype === "admin")
    }
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.margin10}>
        <Image style={styles.renderItemImage} source={{uri: item.imgUrl}} />
        <Text style={styles.renderItemText}>{item.title}</Text>
      </View>
    )
  }

  const openImagePickerAsync = async() => {

      if(!feedText){
        Alert.alert('please Enter the Feed Title')
        return
      }
    
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
  
      const { uri } = await ImagePicker.launchImageLibraryAsync();

      setImageFromGallery(uri)
    }

  const showModal = () => setModalStatus(true)

  const onCloseModal = () => setModalStatus(false)

  const renderInputTextAndUploadButton = () => (
      <>
        <View style={styles.feedText}>
            <Text style={styles.textStyle}>Please Enter the Caption for the Feed</Text>
            <TextInput 
              placeholder="Enter Feed Caption"
              value={feedText}
              onChangeText={text => setFeedText(text)}
              style={styles.textInputStyle}
            />
        </View>
        <View style={[styles.uploadButtonView,styles.flexRow,styles.justifyContentCenter]}>
          <TouchableOpacity 
            style={styles.deleteFeedButton} 
            onPress={onCloseModal}
          >
              <Text style={[styles.textStyleForButtonText,styles.textColor]}>
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.uploadFeed} 
              onPress={openImagePickerAsync}
            >
              <Text style={styles.textStyleForButtonText}>
                Add Image
              </Text>
            </TouchableOpacity>
        </View>
      </>
  )

  const onDeleteButtonPress = () => {
    setImageFromGallery(null)
    setFeedText('')
  }

  const showFeedPreview = () => (
    <View style={styles.showFeedPreviewView}>
      <View style={styles.imageView}>
        <Image 
          source={{uri:imageFromGallery}}  
          style={styles.uploadImage}
          resizeMode="contain"
        />
      </View>
      <View style={{flex:1,}}>
        <Text style={styles.uploadFeedText}>{feedText}</Text>
      </View>
      <View style={[styles.uploadButtonView,styles.flexRow]}>
          <TouchableOpacity style={styles.deleteFeedButton} onPress={onDeleteButtonPress}>
            <Text style={[styles.textStyleForButtonText,styles.textColor]}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadFeed} onPress={() => {}}>
            <Text style={styles.textStyleForButtonText}>Upload Feed</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
    
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerView}>
        <Text style={{fontSize: 30, color:"#fff"}}>V.No. 0.1.4</Text>
      </View>
      <View style={styles.container}>
        <FlatList 
          data={DATA}
          renderItem={renderItem}
        />
      </View>
      {
        showPlusButton &&
            <TouchableOpacity 
                style={styles.plusButtonView}
                onPress={showModal}
            >
              <Entypo
                name="plus"
                color={"#fff"}
                size={35}
              />
            </TouchableOpacity>
        }
      <Modal
        visible={modalStatus}
        style={styles.modalContainer}
      >
        <View style={styles.modalMainView}>
          <View>
            <Text style={styles.modalHeading}>
              ADD NEW FEED
            </Text>
          </View>
          {
            !imageFromGallery
              ? renderInputTextAndUploadButton()
              : showFeedPreview()
          }
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  renderItemText: {
    fontFamily: 'Rubik-Bold',
    fontSize:18,
    marginTop:10,
  },
  renderItemImage:{
    height:250,
    width:'100%',
  },
  margin10:{
    margin:10
  },
  justifyContentCenter : {
    justifyContent:'center'
  },
  textColor:{
    color:'#F7882F'
  },
  showFeedPreviewView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:20,
  },
  textStyleForButtonText: {
    textAlign:"center",
    color : '#fff',
    fontFamily: 'Rubik-Bold',
    fontSize:16,
  },
  uploadButtonView: {
    flex:1,
    alignItems:'center'
  },
  flexRow: { 
    flexDirection:"row"
  },
  uploadButtonStyle: {
      height:55,
      width:200,
      borderRadius:10,
      backgroundColor:'#F7882F',
      justifyContent:'center',
    },
  deleteFeedButton: {
    height:55,
    width:150,
    borderRadius:10,
    borderColor:'#F7882F',
    borderWidth:1,
    justifyContent:'center',
    margin:10,
    backgroundColor:'#fff',
  },
  uploadFeed: {
    height:55,
    width:150,
    borderRadius:10,
    backgroundColor:'#F7882F',
    justifyContent:'center',
    margin:10,
  },
  textInputStyle: {
    height:55,
    borderColor:"#000",
    borderWidth:1,
    padding:10,
    borderRadius:10,
  },
  textStyle: {
    fontFamily:'Rubik-Medium',
    fontSize: 16,
    marginBottom:20,
  },
  feedText : {
    height:55,
    margin:10,
    borderRadius:5,
    padding:10,
    flex:1,
  },
  imageView:{
    flexDirection:'row',
  },
  uploadImage:{
    height:200,
    width:200,
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  },
  uploadFeedText: {
    textAlign:'center',
    fontSize:20,
    fontFamily: 'Rubik-Bold',
    color:'#F7882F',
    margin:20,
  },
  modalMainView:{
    minHeight:500,
    backgroundColor:'#fff',
    margin:20,
  },
  modalHeading: {
    textAlign:'center',
    margin:20,
    fontFamily: 'Rubik-Bold',
    fontSize:20,
  },
  modalContainer: {
    flex: 1,
    margin: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  plusButtonView : {
      position:'absolute',
      right:20,
      bottom:20,
      height:75,
      width:75,
      borderRadius:75,
      elevation:5,
      backgroundColor:'#F7882F',
      flex:1,
      justifyContent:"center",
      alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  safeAreaView:{
    flex: 1,
    backgroundColor: '#F7882F',
  },
  headerView:{
    height: 90,
    backgroundColor: '#F7882F',
    justifyContent: 'center',
    padding:20,
  },
});

const mapStateToProps = createStructuredSelectorCreator({
});

const mapDispatchToProps = {
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'Feed', reducer });
const withSaga = injectSaga({ key: 'Feed', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FeedScreen);
