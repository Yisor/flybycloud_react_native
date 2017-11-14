/*
 * @Author: lsl 
 * @Date: 2017-11-09 16:55:00 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-14 17:05:14
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Tabs,
  Stack,
} from 'react-native-router-flux';
import UserInfoPage from './containers/UserInfoPage';
import HomePage from './containers/HomePage';
import CustomNavBar from './components/CustomNavBar';
import { LoginPage } from './containers/login';

const HomeIcon = (props) => {
  const tab = props.focused ? require('../icons/tabbar_home_down_icon.png') : require('../icons/tabbar_home_icon.png');
  return (
    <Image source={tab} style={styles.tabItem} />
  );
}
const ExamineIcon = (props) => {
  const tab = props.focused ? require('../icons/tabbar_examine_down_icon.png') : require('../icons/tabbar_examine_icon.png');
  return (
    <Image source={tab} style={styles.tabItem} />
  );
}
const TravelIcon = (props) => {
  const tab = props.focused ? require('../icons/tabbar_travel_down_icon.png') : require('../icons/tabbar_travel_icon.png');
  return (
    <Image source={tab} style={styles.tabItem} />
  );
}
const UserIcon = (props) => {
  const tab = props.focused ? require('../icons/tabbar_user_down_icon.png') : require('../icons/tabbar_user_icon.png');
  return (
    <Image source={tab} style={styles.tabItem} />
  );
}

class FeibaRouter extends Component {
  render() {
    return (
      <Router >
        <Stack key="root" titleStyle={{ alignSelf: 'center' }}>
          <Tabs key="tabbar" tabBarPosition="bottom" tabBarStyle={styles.tabbarContainer} >
            <Stack hideNavBar key="tab_home" title="首页" icon={HomeIcon}>
              <Scene key="home" component={HomePage} title="首页" />
            </Stack>
            <Stack hideNavBar key="tab_examine" title="审批" icon={ExamineIcon}>
              <Scene key="examine" component={HomePage} title="审批" />
            </Stack>
            <Stack hideNavBar key="tab_travel" title="行程" icon={TravelIcon}>
              <Scene key="travel" component={HomePage} title="行程" />
            </Stack>
            <Stack hideNavBar key="tab_user" title="我的" icon={UserIcon}>
              <Scene key="user" component={UserInfoPage} title="我的" />
            </Stack>
          </Tabs>
          <Scene key="login" navBar={CustomNavBar} component={LoginPage} initial title="登 录" />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  tabbarContainer: {
    backgroundColor: "#f6f6f6",
  },
  tabItem: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default FeibaRouter;
