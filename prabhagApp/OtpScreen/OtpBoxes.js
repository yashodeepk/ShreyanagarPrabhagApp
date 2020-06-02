import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const WHITE234_COLOR = '#fff'

export default class OtpBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyOtpIndex: -1,
      otpArray: Array(6).fill(''),
      // focusIndexInitial:0
    };
    this.reference = [];
    // this.reference = Array(4).fill(null)
  }

  //==================================================================
  _checkOtp = () => {
    if (this._checkEmptyFieldAndWarn() === -1) {
      this.setState({ emptyOtpIndex: -1 });
      let otp = '';
      otp = this.state.otpArray.join('');
      return otp;
      // NetworkUtils.fetch_data('check_otp',this._fetchCheckOtpCallBack, this._fetchError,{mobile_number:this.state.mobileNumber, otp:otp})
    }
  };

  _checkEmptyFieldAndWarn = () => {
    let { otpArray } = this.state;
    for (let [index, digit] of otpArray.entries()) {
      if (digit === '') {
        this.setState({ emptyOtpIndex: index });
        this.reference[index].focus();
        return index;
      }
    }
    return -1;
  };
  
  _handleOtpDataAndFocus = (index, OtpDigit) => {
    let { otpArray, emptyOtpIndex } = this.state;
    let otpArrayCopy = otpArray.slice();
    otpArrayCopy[index] = OtpDigit;

    this.setState({ otpArray: otpArrayCopy });

    if (OtpDigit !== '' && index !== 5) {
      this.reference[index + 1].focus(); //.current.focus() wont work
    }

    if (OtpDigit !== '' && index === 5) {
      this.setState({ otpArray: otpArrayCopy }, () => this.props.checkOtp(otpArrayCopy));
    }

    if (OtpDigit !== '' && index === emptyOtpIndex) {
      this.setState({ emptyOtpIndex: -1 });
    }
  };

  _handleKeyPress = (index, { nativeEvent }) => {
    let { otpArray } = this.state;
    if (
      nativeEvent.key === 'Backspace' &&
      index !== 0 &&
      otpArray[index] === ''
    ) {
      this.reference[index - 1].focus();
    }
    // else if (nativeEvent.key === 'Enter') {
    //     this._checkOtp()
    // }
  };

  _handleOnFocus = index => {
    null;
  };

  _referenceArray = reference => {
    // this.reference[index] = reference
    this.reference.push(reference);
  };
  //=================================redner fucntions =======================================

  renderOtpBoxes = (index, ref) => {
    let { focusIndexInitial, emptyOtpIndex, otpArray } = this.state,
      boxes = [],
      { type } = this.props;

    for (let index = 0; index < 6; index++) {
      boxes.push(
        <TextInput
          style={[
            styles.OtpBox,
            index === emptyOtpIndex ? styles.OtpBoxEmpty : styles.OtpBoxDefault,
          ]}
          keyboardType="numeric"
          maxLength={1}
          //placeholder=" X"
          value={otpArray[index]}
          onChangeText={text => this._handleOtpDataAndFocus(index, text)}
          //autoFocus={i===focusIndexInitial?true:false}
          onKeyPress={event => {
            this._handleKeyPress(index, event);
          }}
          onFocus={() => this._handleOnFocus(index)}
          ref={this._referenceArray} // equivalent to ref = {ref => this._referenceArray(ref)}
          //onSubmitEditing = {this.props.checkOtp}
          key={index}
        />,
      );
    }
    return boxes;
  };

  render() {
    let { type, heading, sentOn, resendOtp, checkOtp } = this.props;
    return (
      <View>
        <Text style={{ marginBottom: 10 }}>{heading}</Text>
        <View style={{ flexDirection: 'row' }}>{this.renderOtpBoxes()}</View>
        <Text style={{ marginTop: 10, marginBottom: 6 }}>
          {/* <Regular14Brown>Sent on </Regular14Brown> */}
          <Text>Sent on</Text>
          {/* <Bold14Brown>{sentOn}</Bold14Brown> */}
          <Text>{sentOn}</Text>
        </Text>
        <TouchableOpacity onPress={resendOtp}>
          {/* <Bold12Skyblue>Resend Code</Bold12Skyblue> */}
          <Text>Resend</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OtpBox: {
    // fontSize:30,
    // color:"rgb(20,20,20)",
    width: 55,
    height: 55,
    borderRadius: 6,
    marginRight: 11,
    borderWidth: 1,
    borderColor: WHITE234_COLOR,
    textAlign: 'center',
  },
  OtpBoxDefault: {
    backgroundColor: 'white',
  },
  OtpBoxEmpty: {
    backgroundColor: 'red',
  },
});

OtpBoxes.propTypes = {
  type: PropTypes.string,
  heading: PropTypes.string,
  sentOn: PropTypes.string,
  checkOtp: PropTypes.func,
};