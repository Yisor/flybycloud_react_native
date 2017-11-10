/*
 * @Author: lsl 
 * @Date: 2017-11-09 16:58:26 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-10 15:23:52
 */
import React, { PureComponent } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { login } from '../actions/login';

class LoginPage extends PureComponent {

  onPressLogin = () => {
    let testUser = {
      'name': '测试号',
      'age': '100',
    };

    const { dispatch, user, status } = this.props;
    dispatch(login(testUser));
    if (status=="Done") {
      Actions.tabbar();
    }
  }

  onClickAccountApply = () => {
    Alert.alert('账号申请');
  }

  onClickForget = () => {
    Alert.alert('忘记密码');
  }

  render() {
    return (
      <View style={styles.loginForm}>
        <TextInput style={styles.textInput} placeholder="请输入企业编码" underlineColorAndroid="transparent" />
        <TextInput style={styles.textInput} placeholder="请输入手机号" keyboardType='numeric' maxLength={11} underlineColorAndroid="transparent" />
        <TextInput style={styles.textInput} placeholder="请输入密码" secureTextEntry={true} underlineColorAndroid="transparent" />

        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, marginRight: 15, justifyContent: 'space-between' }}>
          <Text onPress={this.onClickAccountApply} style={{ textDecorationLine: 'underline' }}>账号申请</Text>
          <Text onPress={this.onClickForget} style={{ textDecorationLine: 'underline' }}>忘记密码？</Text>
        </View>

        <TouchableOpacity onPress={this.onPressLogin} style={styles.loginButton}>
          <Text style={{ color: '#fff', fontSize: 18 }}>登 录</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', marginTop: 60, color: '#2c3e50', fontSize: 12 }}>该产品暂时只对签约企业开放</Text>
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
});

const select = store => ({
  status: store.userStore.status,
  user: store.userStore.user,
})
export default connect(select)(LoginPage);

