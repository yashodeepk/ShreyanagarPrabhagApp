import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
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


function FeedScreen({ 
  navigation,
}) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerView} />
      <View style={styles.container}>
        <Text>In Feed Screens</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  safeAreaView:{
    flex: 1,
    backgroundColor: '#F7882F',
  },
  headerView:{
    height: 90,
    backgroundColor: '#F7882F',
    flex: 0,
    justifyContent: 'flex-end',
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
