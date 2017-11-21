/*
 * @Author: lsl 
 * @Date: 2017-11-17 11:44:31 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-21 17:21:10
 * @Desc 路线选择
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Divider from '../components/Divider';

class RouteSelection extends Component {
  static propTypes = {
    startCity: PropTypes.string,
    endCity: PropTypes.string,
    onSelectCityStart: PropTypes.func,
    onSelectCityEnd: PropTypes.func,
    icon: PropTypes.any,
    onReverse: PropTypes.func,
  }

  static defaultProps = {
    startCity: '杭州',
    endCity: '北京',
    icon: require('../../icons/home_siteexchange_icon.png'),
  };

  constructor(props) {
    super(props);
    this.state = {
      startCity: this.props.startCity,
      endCity: this.props.endCity
    }
  }

  // 往返对调
  onReverse = () => {
    this.props.onReverse();
  }

  // 出发城市
  renderDepartureCity() {
    return (
      <TouchableOpacity onPress={this.props.onSelectCityStart} activeOpacity={0.5} style={{ flex: 1 }}>
        <Text style={styles.textSetOff}>出发</Text>
        <Text style={[styles.textCity, { marginLeft: 8 }]}>{this.props.startCity}</Text>
        <Divider style={styles.divider} />
      </TouchableOpacity>
    )
  }

  // 目的城市
  renderArrivalCity() {
    return (
      <TouchableOpacity onPress={this.props.onSelectCityEnd} activeOpacity={0.5} style={{ flex: 1 }}>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.textArrive}>到达</Text>
          <Text style={[styles.textCity, { marginRight: 8 }]}>{this.props.endCity}</Text>
        </View>
        <Divider style={styles.divider} />
      </TouchableOpacity>
    )
  }

  // 转化按钮
  renderReverse() {
    return (
      <TouchableOpacity onPress={this.onReverse} activeOpacity={0.8}>
        <ImageBackground style={styles.imgReverse} resizeMode="center" source={require('../../icons/home_siteexchange.png')} >
          <Image style={styles.imgReverse} resizeMode="center" source={this.props.icon} />
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderDepartureCity()}
        {this.renderReverse()}
        {this.renderArrivalCity()}
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCity: {
    fontSize: 16,
    marginTop: 10,
  },
  textSetOff: {
    fontSize: 12,
    marginLeft: 8
  },
  textArrive: {
    fontSize: 12,
    marginRight: 8
  },
  imgReverse: {
    width: 50,
    height: 50,
  },
  divider: {
    backgroundColor: 'gray',
    marginTop: 6,
  }
});

export default RouteSelection;
