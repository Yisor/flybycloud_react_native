/*
 * @Author: lsl 
 * @Date: 2017-11-09 16:55:00 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-17 10:12:01
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
import { AirSearchPage } from './containers/air/airSearch';

// const HomeIcon = (props) => {
//   const tab = props.focused ? require('../icons/tabbar_home_down_icon.png') : require('../icons/tabbar_home_icon.png');
//   return (
//     <Image source={tab} style={styles.tabItem} />
//   );
// }
// const ExamineIcon = (props) => {
//   const tab = props.focused ? require('../icons/tabbar_examine_down_icon.png') : require('../icons/tabbar_examine_icon.png');
//   return (
//     <Image source={tab} style={styles.tabItem} />
//   );
// }
// const TravelIcon = (props) => {
//   const tab = props.focused ? require('../icons/tabbar_travel_down_icon.png') : require('../icons/tabbar_travel_icon.png');
//   return (
//     <Image source={tab} style={styles.tabItem} />
//   );
// }
// const UserIcon = (props) => {
//   const tab = props.focused ? require('../icons/tabbar_user_down_icon.png') : require('../icons/tabbar_user_icon.png');
//   return (
//     <Image source={tab} style={styles.tabItem} />
//   );
// }

class rootRouter extends Component {
  render() {
    return (
      <Router >
        <Stack key="Root" titleStyle={{ alignSelf: 'center' }}>
          <Tabs key="Tabbar" tabBarPosition="bottom" tabBarStyle={styles.tabbarContainer} >
            <Stack hideNavBar key="tab_home" title="首页" >
              <Scene key="Home" component={HomePage} title="首页" />
            </Stack>
            <Stack hideNavBar key="tab_examine" title="审批" >
              <Scene key="Approval" component={HomePage} title="审批" />
            </Stack>
            <Stack hideNavBar key="tab_travel" title="行程" >
              <Scene key="Trip" component={HomePage} title="行程" />
            </Stack>
            <Stack hideNavBar key="tab_user" title="我的" >
              <Scene key="Mine" component={UserInfoPage} title="我的" />
            </Stack>
          </Tabs>

          <Scene key="login" navBar={CustomNavBar} component={LoginPage} title="登 录" />
          <Scene key="airSearch" component={AirSearchPage} title="机票" initial />
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

export default rootRouter;
