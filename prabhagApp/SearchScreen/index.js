import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Linking,
  Platform,
  FlatList,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Modal from 'react-native-modal';
import {
  createStructuredSelectorCreator,
} from '../utils/commonFunctions';
import injectSaga from '../utils/injectSaga';
import injectReducer from '../utils/injectReducer';
import Loader from '../utils/Loader';
import reducer from './reducer';
import saga from './saga';
import {
  FontAwesome,
  Entypo,
} from 'react-native-vector-icons';
import {
  searchTermAction,
  getSingleUserData,
  setSingleUserDataNull,
  getDataFromSearchTerm,
  setModalStatus,
} from "./actions";
import {
  getSearchTermData,
  getModalData,
  getLoaderValue,
  getTotalPageNo,
  getModalStatus,
  getModalIndicatorStatus,
} from "./selectors";
import searchNotFoundImg from "../assets/searchnotfound.png";
import profileImg from "../assets/propic.png";
import { setLoginDetails } from "../utils/asyncStorage";
import { setUserDetails } from "../MainApp/actions";
import { setMobileNumber } from '../LoginScreen/actions'

function logout(setLoginDetails,setUserDetails,setMobileNumber) {
  Alert.alert(
    'Logout',
    'Are you sure that you want to logout?',
    [
      {
        text: 'Yes',
        onPress: () => {
          const emptyString = ''
          setLoginDetails(emptyString)
          setUserDetails(emptyString)
          setMobileNumber(emptyString)
        },
      },
      { text: 'No', onPress: () => null },
    ],
    { cancelable: false },
  )
}

function SearchScreen({
  navigation,
  searchTermAction,
  searchTermDataFromSelector,
  modalData,
  getSingleUserData,
  setSingleUserDataNull,
  loaderDataFromSaga,
  setUserDetails,
  setMobileNumber,
  totalPageNo,
  getDataFromSearchTerm,
  modalStatus,
  setModalStatus,
  modalIndicator,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [page , setPageNo] = useState(1)
  const [savedSearchTerm, setSavedSearchTerm] = useState('')

  //load data default
  useEffect(() => {
    const data = {
      limit : 10,
      page : 1, 
      searchTerm: "",
    }
    getDataFromSearchTerm(data)
  },[])

  useEffect(() => {
      setIsLoading(loaderDataFromSaga)
  }, [loaderDataFromSaga])

  const deBouncing = (callback,delay) => {
    let timer
    return function(searchTerm){
      clearTimeout(timer)
      timer = setTimeout(() => {
        const page = 1
        const limit = 10
        setPageNo(page)
        callback({searchTerm,page,limit})
        setSavedSearchTerm(searchTerm)
      }, delay);
    }
  }

  const sendSearchTextToSaga = deBouncing(getDataFromSearchTerm,500)

  const callNumber = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  const renderModalData = (modalData) => {
    return (
      <View style={[styles.flexOne,]}>
        <View style={styles.renderModalDataImage}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 50, marginTop: 10 }}
            source={profileImg}
          />
        </View>
        <View style={styles.renderModalTextView}>
          <View style={styles.flexRow}>
            <Text style={[styles.renderModalTextBold]}>Name:</Text>
            <Text style={styles.renderModalTextNormal}>{`${modalData.name} `}</Text>          
          </View>
          <View style={[styles.flexRow]}>
            <Text style={[styles.renderModalTextBold]}>Address:</Text>
            <Text style={[styles.renderModalTextNormal]}>{`${modalData.address} `}</Text>          
          </View>
          <View style={styles.flexRow}>
            <Text style={[styles.renderModalTextBold]}>Education:</Text>
            <Text style={styles.renderModalTextNormal}>{`${modalData.education} `}</Text>          
          </View>
          <View style={styles.flexRow}>
            <Text style={[styles.renderModalTextBold]}>Blood group:</Text>
            <Text style={styles.renderModalTextNormal}>{`${modalData.bloodgroup} `}</Text>          
          </View>
          <View style={styles.flexRow}>
            <Text style={[styles.renderModalTextBold]}>Family Code:</Text>
            <Text style={styles.renderModalTextNormal}>{`${modalData.familycode} `}</Text>          
          </View>
          <TouchableOpacity 
            style={[styles.flexRow]} 
            onPress={() => callNumber(modalData.mobileno)}
          >
            <Text style={[styles.renderModalTextBold]}>Mobile No:</Text>
            <Text style={[styles.renderModalTextNormal,{ color: '#0198E1' }]}>{`${modalData.mobileno} `}</Text>          
          </TouchableOpacity>         
        </View>
      </View>
    )
  }

  const onPressOfLogoutButton = () => {
    logout(setLoginDetails,setUserDetails,setMobileNumber)
  }


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalStatus(true)
          getSingleUserData(item.id)
        }}
        key={item.id}
        style={{
          flexDirection: 'row',
          height: 90,
          backgroundColor: '#fff',
          elevation: 5,
          margin: 10,
          padding: 10,
          borderColor: '#FFA500',
          borderWidth: 0.5,
          borderRadius: 10,
        }}>
        <View style={{alignItems: 'center',justifyContent:'center'}}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 50 }}
            source={profileImg}
          />
        </View>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          marginLeft: 10,
        }}>
          <Text style={[styles.textBoldFont,styles.fontSize16]}>
            {item.name}
          </Text>
          <Text style={[styles.textBoldFont,styles.fontSize14]}>
            {item.education}
          </Text>
          <Text style={[styles.textBoldFont,styles.fontSize14,styles.highLightedColor]}>
            {item.familycode}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <FontAwesome
            style={styles.iconStyle}
            name="chevron-right"
            color={"#FFA500"}
            size={16}
          />
        </View>
      </TouchableOpacity>
    )
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

  const onEndReached = () => {
    if(totalPageNo !== page){
      const limit = 10
      searchTermAction({searchTerm: savedSearchTerm,page,limit})
      setPageNo(page+1)   
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <View style={styles.headerView}>
        <View style={styles.logoutView}>
          <Entypo
            style={styles.iconStyle}
            name="log-out"
            color={"#fff"}
            size={20}
            onPress={onPressOfLogoutButton}
          />
        </View>
        <View style={styles.searchView}>
          <View style={styles.searchViewWithElement}>
            <FontAwesome
              style={styles.iconStyle}
              name="search"
              color={"#FFA500"}
              size={16}
            />
            <TextInput
              style={[styles.textInputStyle,styles.textNormalFont]}
              placeholder="Search by name, occupation, blood-group"
              onChangeText={sendSearchTextToSaga}
            />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        {
             <>
                {
                  isLoading &&
                    <Loader isLoading={isLoading} />
                }
                <Modal
				  animationType = {"fade"} 
                  visible={modalStatus}
                  onBackButtonPress={() => {
                    setSingleUserDataNull()
                    setModalStatus(false)
                  }}
                  onBackdropPress={() => {
                    setSingleUserDataNull()
                    setModalStatus(false)
                  }}
                  style={styles.modalContainer}
                >
                  <View style={styles.modalInnerView}>
                    <View style={styles.modalStyle}>
                      {
                        modalIndicator 
                        ? <Loader isLoading={modalIndicator}/>
                        :  modalData
                            ? renderModalData(modalData.toJS())
                            : <View style={styles.errorText}>
                                <Text>Something went wrong</Text>
                              </View>
                      }
                    </View>
                  </View>
                </Modal>
                <FlatList 
                  data={searchTermDataFromSelector.toJS()}
                  renderItem={renderItem}
                  ListEmptyComponent={renderEmptyListComponent}
                  extraData={[searchTermDataFromSelector.toJS()]}
                  onEndReachedThreshold={0.1}
                  onEndReached={onEndReached}
                  contentContainerStyle={{ flexGrow: 1 }}
                />
              </>
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flexOne: { 
    flex: 1 
  },
  imgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#FFA900',
  },
  headerView: {
    height: 90,
    backgroundColor: '#FFA500',
    flex: 0,
    justifyContent: 'flex-end',
	elevation:5,
  },
  logoutView: {
    height: 40,
    backgroundColor: '#FFA500',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 5,
  },
  searchView: {
    backgroundColor: '#fff',
    height: 40,
    marginTop: 0,
    margin: 10,
    borderRadius: 5,
  },
  iconStyle: {
    marginRight: 10,
    marginLeft: 10,
  },
  searchViewWithElement: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    padding: 10,
  },
  listImgView: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: 'rgb(204, 204, 204)',
    marginRight: 10,
  },
  listDetails: {
    flexDirection: 'column'
  },
  imageStyle: {
    height: 40,
    width: 40,
  },
  modalStyle: {
    backgroundColor: 'white',
    minHeight: 375,
    elevation: 10,
    borderRadius: 5,
    margin: 20,
    borderColor: '#FFA500',
    borderWidth: 0.5,
    borderRadius: 10,
    overflow:'scroll',
  },
  modalInnerView: {
    justifyContent: 'center',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    margin: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  renderModalDataImage: {
    alignItems: 'center',
    flex: 0,
	height: 70,
    marginBottom: 5,
	borderTopLeftRadius: 5,
	borderTopRightRadius: 5,
	backgroundColor: '#FFA500',
  },
  renderModalTextView: {
    flex: 1,
	paddingLeft: 20,
	paddingRight: 20,
	paddingBottom: 20,
    // justifyContent: "center",
    // alignItems: 'center',
    justifyContent:"space-between",

  },
  renderModalTextBold: {
	width: '40%',  
    fontSize: 14,
    fontFamily: 'Rubik-Bold'
  },
  renderModalTextNormal: {
	width: '90%',  
    fontSize: 14,
    fontFamily:'Rubik-Medium',
    marginLeft: 2
  },
  flexRow: {
    flexDirection: 'row',
    width: '80%',
  },
  errorText:{ 
    justifyContent: "center", 
    flex: 1, 
    alignItems: 'center',
    fontWeight:"bold",
    fontSize: 20,
 },
 textNormalFont : {
   fontFamily: 'Rubik-Bold'
 },
 textBoldFont : {
  fontFamily: 'Rubik-Medium'
},
fontSize16 : {
  fontSize: 16,
},
fontSize14 : {
  fontSize: 14,
},
highLightedColor: {
  color: '#FFA500'
}
});

const mapStateToProps = createStructuredSelectorCreator({
  searchTermDataFromSelector: getSearchTermData,
  modalData: getModalData,
  loaderDataFromSaga: getLoaderValue,
  totalPageNo : getTotalPageNo,
  modalStatus : getModalStatus,
  modalIndicator :getModalIndicatorStatus,
});

const mapDispatchToProps = {
  searchTermAction,
  getSingleUserData,
  setSingleUserDataNull,
  setUserDetails,
  setMobileNumber,
  getDataFromSearchTerm,
  setModalStatus,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'searchScreenKey', reducer });
const withSaga = injectSaga({ key: 'searchScreenKey', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchScreen);
