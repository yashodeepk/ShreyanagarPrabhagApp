import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { compose } from 'redux';
import iconImage from "../assets/main.png";
import {
  createStructuredSelectorCreator,
} from '../utils/commonFunctions';
import injectSaga from '../utils/injectSaga';
import injectReducer from '../utils/injectReducer';
import Loader from '../utils/Loader';
import reducer from './reducer';
import saga from './saga';
import { FlatList } from "react-native-gesture-handler";
import { 
  DATA,
  uploadImage,
  getFeed,
  getBirthday,
} from "./actions";
import {
  Entypo,
} from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { getLoginDetails } from "../utils/asyncStorage";
import { 
  getLoaderValue,
  getFeedData,
  getBirthdaysSelector,
} from "./selectors";
import searchNotFoundImg from "../assets/searchnotfound.png";
import Carousel from 'react-native-banner-carousel';
const LIMIT = 10

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;




function FeedScreen({ 
  navigation,
  getLoaderValue,
  uploadImage,
  getFeed,
  getFeedData,
  getBirthday,
  birthdays,
}) {

  const [modalStatus , setModalStatus] = useState(false)
  const [feedText, setFeedText] = useState('')
  const [imageFromGallery,setImageFromGallery] = useState('')
  const [showPlusButton , setShowPlusButton] = useState(false)
  const [userInfo , setUserInfo] = useState(null)
  const [pageNo , setPageNo] = useState(1)
  const [openInfoModal, setOpenInfoModal] = useState(false)

  useEffect(() => {
    getFeed({pageNo,LIMIT})
    getBirthday()
  },[])

  useEffect(() => {
    async function fetchData() {
        const data = await getLoginDetails()
        const userInfo = JSON.parse(data)
        setShowPlusButton(userInfo.usertype === "admin")
        setUserInfo(userInfo)
    }
    fetchData();
  }, []);

  if (getLoaderValue) {
    return <Loader isLoading={getLoaderValue} />;
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.margin10} key={item.id}>
        <Image style={styles.renderItemImage} source={{uri: item.imageURL}} />
        <Text style={styles.renderItemText}>{item.discription}</Text>
        <Text style={styles.renderItemText1}>{`Posted by ${item.name}`}</Text>
      </View>
    )
  }

  console.log('birthdays is ', birthdays)

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

  const uploadFeed = () => {

    const name = `${feedText}.jpg`;
    const body = new FormData();

    body.append("picture", {
      uri: imageFromGallery,
      name,
      type: "image/jpg"
    });

    const closeModalOnSuccess = () => {
      setImageFromGallery(null)
      setFeedText('')
      setModalStatus(false)
    }

    const user = {
      name: userInfo.name || '',
      title: feedText,
      callback: closeModalOnSuccess,
    }

    const payload = { 
      body : body, 
      userInfo :  user,
    }
    
    uploadImage(payload)
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
          <TouchableOpacity style={styles.uploadFeed} onPress={uploadFeed}>
            <Text style={styles.textStyleForButtonText}>Upload Feed</Text>
          </TouchableOpacity>
      </View>
    </View>
  )

  const onEndReached = () => {
    if(getFeedData.totalPages !== pageNo){
      getFeed({pageNo,LIMIT})
      setPageNo(page+1)
    }
  }

  const renderEmptyListComponent = () => {
    return (
      <View style={styles.imgView}>
        <Image
          style={styles.imgStyle}
          resizeMode="contain"
          source={searchNotFoundImg}
        />
      </View>
    )
  }

  const renderPage = (obj) => {
        return (
            <View key={obj.id} style = {{height: 50, marginLeft: 20, marginRight: 20,marginTop: 20}}>
                <Text style={{
                    fontFamily: 'Rubik-Medium',
                    fontSize:15,
                    textAlign:'center',
				      	  }}
                >
					            {obj.name} 
			          </Text>
            </View>
        )
  }
	
  const openAppDevelopedByModal = () => setOpenInfoModal(true) 
  
  const onCloseAppInfoModal = () => setOpenInfoModal(false)

  const renderHeader = () => {
    return (
      <View style = {styles.scrollercontainer}>
        <Carousel
            autoplay
            autoplayTimeout={2000}
            loop
            index={0}
            pageSize={BannerWidth}
        >
          { 
              birthdays.map((obj) => renderPage(obj))
          }
        </Carousel>
      </View>
    )
  }
    
  return (
  <SafeAreaView style={styles.safeAreaView}>
    <View style={styles.headerView}>
      <View style={styles.flexRow}>
        <View style={styles.logostyle}>
          <Image 
            source={iconImage}
            style={{
              width:60,
              height:60,
            }}
          />
        </View>
        <Text style={styles.headerText1}>
                Maheshwari mandal {'\n'} 
            <Text style={styles.headerText}>
                Shreyanagar prabhag
            </Text>	
        </Text>
      </View>	
        <TouchableOpacity onPress={openAppDevelopedByModal} style={{justifyContent:'center'}}>
            <Entypo 
              name="info-with-circle"
              size={25}
              color="#FFF"
            />
        </TouchableOpacity>
      </View>
	    <View style = {styles.container}>
        <FlatList 
          data={getFeedData.responseData}
          renderItem={renderItem}
          extraData={getFeedData}
          onEndReachedThreshold={0.1}
          onEndReached={onEndReached}
          ListEmptyComponent={renderEmptyListComponent}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={renderHeader}
        />
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
		    animationType = {"fade"} 
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
      <Modal
		    animationType = {"fade"} 
        visible={openInfoModal}
        style={styles.modalContainer}
        onBackButtonPress={onCloseAppInfoModal}
        onBackdropPress={onCloseAppInfoModal}
      >
        <View style={styles.userInfoModalStyle}>
          <View>
            <Text style={styles.modalHeading}>
              Shreyanagar Prabhag App 
            </Text>
          </View>
          <View>
            <Text style={styles.modalHeading}>Prabhag Pramukh - Rameshwar karwa</Text>
          </View>
          <View>
            <Text style={styles.modalHeading}>App Developed by {'\n'} {'\n'} Yashodeep Kacholiya and Saurabh Kacholiya</Text>
          </View>
        </View>
      </Modal>
	  </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  imgView : {
    justifyContent: "center",
    alignItems: 'center',
    flex:1,
  },
  scrollercontainer: {
		flex: 1,
        justifyContent: 'center',
		marginBottom:10,
		backgroundColor: '#FFF',
  },
  imgStyle: {
    width: 300,
    height: 300,
  },
  headerText:{
	  fontFamily: 'Rubik-Bold',
    fontSize:16,
    marginTop:2,
    marginLeft:5,
    color: '#fff',
  },
  headerText1: {
	  fontFamily: 'Rubik-Bold',
    fontSize:10,
    marginTop: 8,
    marginLeft: 5,
	  color: '#fff',
  },
  renderItemText: {
    fontFamily: 'Rubik-Medium',
    fontSize:18,
    marginTop:10,
	marginLeft: 10,
    textAlign:'left',
  },
  renderItemText1: {
    fontFamily: 'Rubik-Medium',
    fontSize:12,
    marginTop:5,
	marginLeft: 10,
	marginBottom:5,
    textAlign:'left',
	color:'#FFA000',
  },
  renderItemImage:{
	marginTop:10,
    height:500,
    width:'100%',
  },
  margin10:{
    marginBottom:20,
	  backgroundColor: '#fff',
  },
  justifyContentCenter : {
    justifyContent:'center'
  },
  textColor:{
    color:'#FFA500'
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
      backgroundColor:'#FFA500',
      justifyContent:'center',
    },
  deleteFeedButton: {
    height:55,
    width:150,
    borderRadius:10,
    borderColor:'#FFA500',
    borderWidth:1,
    justifyContent:'center',
    margin:10,
    backgroundColor:'#fff',
  },
  uploadFeed: {
    height:55,
    width:150,
    borderRadius:10,
    backgroundColor:'#FFA500',
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
    color:'#FFA500',
    margin:20,
  },
  modalMainView:{
    height: 500,
    backgroundColor:'#FFF',
    margin:20,
	  borderRadius:5,
  },
  userInfoModalStyle:{
    height: 300,
    backgroundColor:'#FFA500',
    margin:20,
	  borderRadius:5,
  },
  modalHeading: {
    textAlign:'center',
    margin:20,
    fontFamily: 'Rubik-Bold',
    fontSize:18,
	  color: '#fff',
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
      height:50,
      width:50,
      borderRadius:50,
      elevation:5,
      backgroundColor:'#FFA500',
      flex:1,
      justifyContent:"center",
      alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
	elevation: 2,
  },
  safeAreaView:{
    flex: 1,
    backgroundColor: '#FFA900',
  },
  headerView:{
    height: 90,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    padding:20,
    elevation: 5,
    justifyContent:"space-between",
    flexDirection:'row',
  },
  flexRow:{
	  flexDirection: 'row',
  },
});

const mapStateToProps = createStructuredSelectorCreator({
  getLoaderValue,
  getFeedData,
  birthdays: getBirthdaysSelector,
});

const mapDispatchToProps = {
  uploadImage,
  getFeed,
  getBirthday,
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
