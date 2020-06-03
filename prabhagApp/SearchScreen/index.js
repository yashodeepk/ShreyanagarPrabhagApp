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
} from "./actions";
import {
  getSearchTermData,
  getModalData,
  getLoaderValue,
} from "./selectors";
import searchNotFoundImg from "../assets/searchnotfound.png";
import womenImg from '../assets/womenImg.png'
import menImg from '../assets/menImg.png'
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
}) {
  const [searchData, setSearchData] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const [singleUserData, setSingleUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page , setPageNo] = useState(1)

  useEffect(() => {
      setIsLoading(loaderDataFromSaga)
  }, [loaderDataFromSaga])

  useEffect(() => {
    if (modalData) {
      setSingleUserData(modalData.toJS())
    }
  }, [modalData])

  useEffect(() => {
    setSearchData(searchTermDataFromSelector.toJS())
  }, [searchTermDataFromSelector])

  const deBouncing = (callback,delay) => {
    let timer
    return function(searchTerm){
      clearTimeout(timer)
      timer = setTimeout(() => {
        callback(searchTerm)
      }, delay);
    }
  }

  const sendSearchTextToSaga = deBouncing(searchTermAction,500)

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
            style={{ height: 50, width: 50, borderRadius: 50 }}
            source={
              modalData.Gender === "Male"
                ? menImg
                : womenImg
            }
          />
        </View>
        <View style={styles.renderModalTextView}>
          <Text style={styles.renderModalText}>{`Name:- ${modalData.name} `}</Text>
          <Text style={styles.renderModalText}>{`Address:- ${modalData.Address}`} </Text>
          <Text style={styles.renderModalText}>{`Occupation:- ${modalData.occupation} `}</Text>
          <Text style={styles.renderModalText}>{`Blood group:- ${modalData.bloodgroup}`} </Text>
          <Text style={styles.renderModalText}>{`Gender:- ${modalData.Gender}`}</Text>
          <Text style={styles.renderModalText}>Mobile No:-
            <Text onPress={() => callNumber(modalData.mobileno)} style={{ color: '#0198E1' }}>{` ${modalData.mobileno}`}</Text>
          </Text>
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
          borderColor: '#F7882F',
          borderWidth: 0.5,
          borderRadius: 10,
        }}>
        <View style={{alignItems: 'center',justifyContent:'center'}}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 50 }}
            source={
              item.Gender === "Male"
                ? menImg
                : womenImg
            }
          />
        </View>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          marginLeft: 10,
        }}>
          <Text style={{fontSize:16,fontWeight:"500"}}>{item.name}</Text>
          <Text style={{fontSize:14,fontWeight:"300"}}>{item.occupation}</Text>
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
            color={"#F7882F"}
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
              color={"#F7882F"}
              size={16}
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Search by name, occupation, blood-group"
              onChangeText={sendSearchTextToSaga}
            />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        {
          isLoading
            ? <Loader isLoading={isLoading} />
            : <>
                <Modal
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
                        singleUserData
                          ? renderModalData(singleUserData)
                          : <View style={styles.errorText}>
                              <Text>Something went wrong</Text>
                            </View>
                      }
                    </View>
                  </View>
                </Modal>
                <FlatList 
                  data={searchData}
                  renderItem={renderItem}
                  ListEmptyComponent={renderEmptyListComponent}
                  extraData={[searchData]}
                  // onEndReachedThreshold={0.5}
                  // onEndReached={() => {
                  //   searchTermAction()
                  // }}
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
    backgroundColor: '#fff',
  },
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#F7882F',
  },
  headerView: {
    height: 90,
    backgroundColor: '#F7882F',
    flex: 0,
    justifyContent: 'flex-end',
  },
  logoutView: {
    height: 40,
    backgroundColor: '#F7882F',
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
    padding:20,
    height: 350,
    elevation: 10,
    borderRadius: 5,
    margin: 20,
    borderColor: '#F7882F',
    borderWidth: 0.5,
    borderRadius: 10,
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
    margin: 10,
  },
  renderModalTextView: {
    flex: 0,
    justifyContent: "center",
    alignItems: 'center',
  },
  renderModalText: {
    lineHeight: 40,
  },
  errorText:{ 
    justifyContent: "center", 
    flex: 1, 
    alignItems: 'center',
    fontWeight:"bold",
    fontSize: 20,
 }
});

const mapStateToProps = createStructuredSelectorCreator({
  searchTermDataFromSelector: getSearchTermData,
  modalData: getModalData,
  loaderDataFromSaga: getLoaderValue,
});

const mapDispatchToProps = {
  searchTermAction,
  getSingleUserData,
  setSingleUserDataNull,
  setUserDetails,
  setMobileNumber,
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
