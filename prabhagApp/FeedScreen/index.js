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
import { FlatList } from "react-native-gesture-handler";
import { DATA } from "./actions";

function FeedScreen({ 
  navigation,
}) {
  const renderItem = ({ item }) => {
    return (
      <View style={{margin:10}}>
        <Image style={{height:250,width:'100%'}} source={{uri: item.imgUrl}} />
        <Text style={{fontWeight:'bold',fontSize:18,marginTop:10}}>{item.title}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerView}>
        <Text style={{fontSize: 30, color:"#fff"}}>I am Header</Text>
      </View>
      <View style={styles.container}>
        <FlatList 
          data={DATA}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
