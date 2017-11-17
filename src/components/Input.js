import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';

class Input extends Component {
  static propTypes = {
      autoFocus: PropTypes.bool,
      placeholder: PropTypes.string,
      autoCorrect: PropTypes.bool,
      maxLength: PropTypes.number,
      editable: PropTypes.bool,
      clearButtonMode: PropTypes.bool,
      onDelTextHandle:PropTypes.func
  }
  
  constructor(props) {
    super(props);
    this.state = {
      iptVal: '',
      isEditing: true
    }
  }

  render() {
      return (
        <View style={[styles.inputWrap, this.props.style]}>
          <TextInput
            style={styles.textInput}
            autoFocus={this.props.autoFocus}
            autoCorrect={this.props.autoCorrect}
            keyboardType={this.props.keyboardType}
            maxLength={this.props.maxLength}
            onChangeText={(text) => {
              this.props.onChangeText(text);
            }}
            onFocus={() => {
              this.setState({
                isEditing: true
              });
            }}
            onBlur={() => {
              this.setState({
                isEditing: false
              });
            }}
            value={this.props.value}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            editable={this.props.editable}
            underlineColorAndroid={'#fff'}
          />
          {this.state.isEditing ?
            <TouchableOpacity style={this.props.clearButtonMode && this.props.value ? styles.inputDel : ''} onPress={this.props.onDelTextHandle}>
              <Image style={this.props.clearButtonMode && this.props.value ? styles.inputDelImg : styles.inputDelImgNone} resizeMode={'stretch'} source={require('../../icons/icon_delete.png')} />
            </TouchableOpacity> :
            <View/>
          }
        </View>
      );
  }
}

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1, 
    marginLeft: 0, 
    paddingLeft: 0, 
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  inputDel: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 16,
    height: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputDelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputDelImg: {
    width: 16,
    height: 16,
    opacity: 0.2
  },
  inputDelImgNone: {
    width: 0,
    height: 0
  },
});

export default Input;
