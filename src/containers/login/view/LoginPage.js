/*
 * @Author: lsl 
 * @Date: 2017-11-09 16:58:26 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-17 10:08:12
 */
import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { login } from '../actions';
import { RSA } from '../../../utils/encrypt';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      corpCode: '',
      phone: '',
      password: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.status == "Done") {
      Actions.tabbar();
      return false;
    }
    return true;
  }

  onChangeCorpCode = (text) => {
    this.setState({ corpCode: text });
  }

  onChangePhone = (text) => {
    this.setState({ phone: text });
  }

  onChangePswd = (text) => {
    RSA(text).then((encrypted) => {
      this.setState({ password: encrypted });
    });
  }

  handleLogin = () => {
    let loginInfo = {
      "corpCode": this.state.corpCode,
      "accountName": this.state.phone,
      "accountPassword": this.state.password
    }

    this.props.dispatch(login(loginInfo));
  }

  handleAccountApply = () => {
    Alert.alert('账号申请');

  }

  handleForget = () => {
    Alert.alert('忘记密码');
	  RSA.encrypt('123').then((encyptedStr) => {
		  console.log(encyptedStr+'ios');
	  })
  }

  render() {
    return (
      <View style={styles.loginForm}>
        <TextInput style={styles.textInput} placeholder="请输入企业编码" underlineColorAndroid="transparent" onChangeText={this.onChangeCorpCode} />
        <TextInput style={styles.textInput} placeholder="请输入手机号" keyboardType='numeric' maxLength={11} underlineColorAndroid="transparent" onChangeText={this.onChangePhone} />
        <TextInput style={styles.textInput} placeholder="请输入密码" secureTextEntry={true} underlineColorAndroid="transparent" onChangeText={this.onChangePswd} />

        <View style={styles.otherContainer}>
          <Text onPress={this.handleAccountApply} style={styles.textUnderline}>账号申请</Text>
          <Text onPress={this.handleForget} style={styles.textUnderline}>忘记密码？</Text>
        </View>

        <TouchableOpacity onPress={this.handleLogin} style={styles.loginButton}>
          <Text style={styles.textLogin}>登 录</Text>
        </TouchableOpacity>

        <Text style={styles.textTip}>该产品暂时只对签约企业开放</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    resizeMode: 'stretch',
    //祛除内部元素的白色背景
    backgroundColor: 'rgba(0,0,0,0)',
  },
  loginForm: {
    flex: 1,
    marginLeft: 45,
    marginRight: 45,
    marginTop: 20,
  },
  textInput: {
    height: 50,
    padding: 0,
    fontSize: 16,
    marginTop: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  loginButton: {
    height: 45,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#646B6E",
  },
  textLogin: {
    color: '#fff',
    fontSize: 18
  },
  textTip: {
    textAlign: 'center',
    marginTop: 60,
    color: '#2c3e50',
    fontSize: 12
  },
  otherContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between'
  },
  textUnderline: {
    textDecorationLine: 'underline'
  }
});

const select = store => ({
  status: store.userStore.status,
  user: store.userStore.user,
})
export default connect(select)(LoginPage);

