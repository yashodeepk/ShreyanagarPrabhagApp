import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  ScrollView,
  FlatList,
  Keyboard
  } from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

const listItems = ['Ramesh Bhakkad', 'Yashodeep Kacholiya', 'Aruna kabra', 'Ramesh kabra', 'Yashodeep Kacholiya', 'Aruna Kacholiya', 'Ramesh Kacholiya', 'Yashodeep kabra', 'Aruna Bhakkad', 'Ramesh bhutada',  'Yashodeep bhutada', 'Aruna bhutada', 'Ramesh Bhakkad', 'Yashodeep Kacholiya', 'Aruna kabra', 'Ramesh kabra', 'Yashodeep Kacholiya','Ramesh Bhakkad', 'Yashodeep Kacholiya', 'Aruna kabra', 'Ramesh kabra', 'Yashodeep Kacholiya','Ramesh Bhakkad', 'Yashodeep Kacholiya', 'Aruna kabra', 'Ramesh kabra', 'Yashodeep Kacholiya']

export default class Main extends React.Component {

  state = {
    searchBarFocused: false
  }

  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }


  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true })
  } 


  keyboardDidHide = () => {
    this.setState({ searchBarFocused: false })
  }

  render() {

    return (
      <View style = {styles.container}>

        <View style= {styles.statusBar}>
        </View>

        <View style = {styles.header}>
          <Text style = {styles.headerText}>Shreyanagar Prabhag</Text>
          <Animatable.View animation = "slideInRight" duration={500} style = {styles.searchBar}> //Animation
            <Animatable.View animation={this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration={400}>
              <Icon name={this.state.searchBarFocused ? "md-arrow-back" : "ios-search"} style={styles.searchIcon} />
            </Animatable.View>
            <TextInput style = {styles.searchInput}
              placeholder = 'Search'
            >
            </TextInput>
          </Animatable.View>
        </ View>

        <FlatList
          style={{ backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)': 'white' }}
          data={listItems}
          renderItem={({ item }) => <Text style={{ padding: 10, fontSize: 15 }}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  searchBar:
  {
    backgroundColor: '#fff',
    height: 30,
    marginBottom:15,
    marginLeft:15,
    marginRight:15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },

  statusBar:
  {
    padding:16,
    backgroundColor: '#F7882F',
  },

  header:{
    backgroundColor: '#F7882F',
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(75,75,75,0.1)',
  },

  headerText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
    padding: 10,
  },

  scrollcontainer: {
    flex: 1,
    marginBottom: 100,
  },

  searchIcon:{
    fontSize: 24,
    marginLeft: 10,
    color: '#F7882F'
  },

  searchInput: {
    fontSize: 20,
    marginLeft: 10,
  },
});
