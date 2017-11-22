/*
 * @Author: lsl 
 * @Date: 2017-11-09 16:55:00 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-22 10:23:42
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
import { FlightMainPage } from './containers/flight/main';
import SelectCityPage from './containers/city/SelectCityPage';
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
        <Stack key="root" titleStyle={{ alignSelf: 'center' }}>
          <Tabs key="tabbar" tabBarPosition="bottom" tabBarStyle={styles.tabbarContainer} >
            <Stack hideNavBar key="tab_home" title="首页" >
              <Scene key="home" component={HomePage} title="首页" />
            </Stack>
            <Stack hideNavBar key="tab_examine" title="审批" >
              <Scene key="approval" component={HomePage} title="审批" />
            </Stack>
            <Stack hideNavBar key="tab_travel" title="行程" >
              <Scene key="trip" component={HomePage} title="行程" />
            </Stack>
            <Stack hideNavBar key="tab_user" title="我的" >
              <Scene key="mine" component={UserInfoPage} title="我的" />
            </Stack>
          </Tabs>

          <Scene key="login" navBar={CustomNavBar} component={LoginPage} title="登 录" initial />
          <Scene key="flight" component={FlightMainPage} title="机票" />
          <Scene back key="city" component={SelectCityPage} title="城市" />
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
