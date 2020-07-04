import React, { Component } from 'react';
import { View } from 'react-native';
import { DotIndicator } from 'react-native-indicators';

const SKY_BLUE_COLOR = '#FFA500';


export default class Loader extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9000,
            backgroundColor: 'rgba(52, 52, 52, 0.1)',
          }}
        >
          <DotIndicator color={SKY_BLUE_COLOR} />
        </View>
      );
    } else {
      return null;
    }
  }
}
