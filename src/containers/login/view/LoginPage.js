/*
 * @Author: lsl 
 * @Date: 2017-11-09 16:58:26 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-22 11:21:26
 */
import React, { Component } from 'react';
import { View, Text, TextInput, Image, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { login } from '../actions';
import { RSA } from '../../../utils/encrypt';
import window from '../../../utils/window';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      corpCode: '2016',
      phone: '',
      password: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.status == "Done") {
      Actions.flight();
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
    RSA.encrypt(text).then((encrypted) => {
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

  handleForget = () => {
    Alert.alert('忘记密码');
    RSA.encrypt('123').then((encyptedStr) => {
      console.log(encyptedStr + 'ios');
    })
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        resizeMode="stretch"
        source={require('../../../resources/assets/login/login_bg.jpg')}>
        <View style={styles.loginForm}>
          <View style={styles.inputView}>
            <Image style={styles.icon} source={require('../../../resources/assets/login/login_company.png')} />
            <TextInput style={styles.textInput}
              defaultValue="2016"
              placeholder="企业编码"
              placeholderTextColor="#323b43"
              underlineColorAndroid="transparent"
              returnKeyType='next'
              onChangeText={this.onChangeCorpCode} />
          </View>

          <View style={styles.inputView}>
            <Image style={styles.icon} source={require('../../../resources/assets/login/login_phone.png')} />
            <TextInput style={styles.textInput}
              placeholder="手机号"
              placeholderTextColor="#a0a4a8"
              keyboardType='numeric'
              maxLength={11}
              underlineColorAndroid="transparent"
              returnKeyType='next'
              onChangeText={this.onChangePhone} />
          </View>

          <View style={styles.inputView}>
            <Image style={styles.icon} source={require('../../../resources/assets/login/login_password.png')} />
            <TextInput style={styles.textInput}
              placeholder="密码"
              placeholderTextColor="#a0a4a8"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              returnKeyType='done'
              onChangeText={this.onChangePswd} />
          </View>

          <TouchableOpacity activeOpacity={0.6} onPress={this.handleLogin} style={styles.loginButton}>
            <Text style={styles.textLogin}>登 录</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.otherContainer}>
            <Text onPress={this.handleForget} style={styles.textForget}>忘记密码？</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
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
    resizeMode: 'stretch',
    //祛除内部元素的白色背景
    backgroundColor: 'rgba(0,0,0,0)',
  },
  loginForm: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 35,
  },
  inputView: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    textAlign: 'center',
    padding: 0,
    fontSize: 16,
    marginRight: 37,
  },
  loginButton: {
    height: 45,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#8bc7fb",
  },
  textLogin: {
    color: '#fff',
    fontSize: 16
  },
  textTip: {
    textAlign: 'center',
    marginTop: 60,
    color: '#2c3e50',
    fontSize: 12
  },
  otherContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center'
  },
  textForget: {
    fontSize: 14,
    color: "#a0a4a8"
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 6,
    marginRight: 6
  }
});

const select = store => ({
  status: store.user.login.status,
  user: store.user.login.user,
})
export default connect(select)(LoginPage);

