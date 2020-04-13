import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TextInput,
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
import {
  FontAwesome,
  Entypo,
} from 'react-native-vector-icons';
import { 
  searchTermAction,
} from "./actions";
import { 
  getSearchTermData
} from "./selectors";

function logout() {
  Alert.alert(
    'Logout',
    'Are you sure that you want to logout?',
    [
      {
        text: 'Yes',
        onPress: () => null,
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
}) {
  function sendSearchTextToSaga(data){
    if(data.length >= 3){
      searchTermAction(data)
    }
  }
  console.log('searchTermDataFromSelector is ', searchTermDataFromSelector)
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <View style={styles.headerView}>
        <View style={styles.logoutView}>
          <Entypo
            style={styles.iconStyle}
            name="log-out"
            color={"#fff"}
            size={20}
            onPress={logout}
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
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
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
});

const mapStateToProps = createStructuredSelectorCreator({
  searchTermDataFromSelector : getSearchTermData,
});

const mapDispatchToProps = {
  searchTermAction,
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
