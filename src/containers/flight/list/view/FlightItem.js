import React, { Component } from 'react';
import { View, Text, Image, ListView, StyleSheet, ActivityIndicator, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { flightQuery } from '../action';
import TabView from '../../../../components/TabView';
import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import { formatTime } from '../../../../utils/timeUtils';

const MealTypes = ['无餐食', '早餐', '午餐', '正餐', '小吃', '点心'];
const isShare = [false, true];// 是否共享
const isStopover = [false, true]; // 是否经停

class FlightItem extends Component {

  //机场名称
  renderAirfield(rowData) {
    return (
      <View style={styles.airfieldContainer}>
        <Text style={styles.flightInfoFont}>{rowData.departureAirport}</Text>
        <Text style={styles.flightInfoFont}>{rowData.destinationAirport}</Text>
      </View>
    );
  }

  renderFlightArrow(rowData) {
    return (isStopover[rowData.isStopover] ?
      <View style={{ alignItems: 'center', }}>
        <Text style={styles.stopoverText}>经停</Text>
        <Image
          style={styles.flightArrowImg}
          source={require('../../../../resources/assets/plane/plane_stopover_arrow_icon.png')}
        />
      </View>
      : <Image style={styles.flightArrowImg} source={require('../../../../resources/assets/plane/plane_arrow_icon.png')} />
    );
  }

  // 航班时间
  renderFlightTime(rowData) {
    return (
      <View style={styles.flightTimeContainer}>
        <Text style={styles.flightTime}>{formatTime(rowData.departureTime)}</Text>
        {this.renderFlightArrow(rowData)}
        <Text style={styles.flightTime}>{formatTime(rowData.destinationTime)}</Text>
      </View>
    );
  }

  // 是否共享
  renderIsShare(rowData) {
    return (isShare[rowData.isShare] ?
      <View style={styles.isShareBg}>
        <Text style={styles.isShareText}>共享</Text>
      </View> : null
    );
  }

  // 最低价格
  renderMinPrice(rowData) {
    return (
      <View style={styles.minPriceContainer}>
        <Text style={styles.minPriceFont}>{`¥${rowData.minPrice}`}</Text>
      </View>
    );
  }

  onPressItem(rowData) {
    let { onPressItem } = this.props;
    onPressItem && onPressItem(rowData);
  }

  render() {
    let { rowData } = this.props;
    return (
      <TouchableOpacity style={styles.rowContainer} activeOpacity={0.6} onPress={() => this.onPressItem(rowData)}>
        <View style={{ flex: 1 }}>
          {this.renderFlightTime(rowData)}
          {this.renderAirfield(rowData)}
          <View style={styles.flyInfoContainer}>
            <Text style={styles.flightInfoFont}>{rowData.airlineShortName}</Text>
            {this.renderIsShare(rowData)}
            <Text style={styles.verticalDivider}>|</Text>
            <Text style={styles.flightInfoFont}>{rowData.flightNumber}</Text>
            <Text style={styles.verticalDivider}>|</Text>
            <Text style={styles.flightInfoFont}>{rowData.planeType}</Text>
            <Text style={styles.verticalDivider}>|</Text>
            <Text style={styles.flightInfoFont}>{MealTypes[rowData.mealType]}</Text>
          </View>
        </View>
        {this.renderMinPrice(rowData)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  rowContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    marginTop: 20
  },
  flightTime: {
    fontSize: 20,
    color: "#323b43"
  },
  flightTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flyInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  flightInfoFont: {
    fontSize: 12,
    color: "#a0a4a8",
  },
  verticalDivider: {
    marginLeft: 5,
    marginRight: 5
  },
  airfieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  stopoverText: {
    fontSize: 10,
    color: "#51a6f0"
  },
  flightArrowImg: {
    width: 44,
    height: 3
  },
  isShareBg: {
    borderRadius: 2,
    backgroundColor: "#51a6f0",
    marginLeft: 5
  },
  isShareText: {
    fontSize: 8,
    color: "#fff",
    marginLeft: 4,
    marginRight: 4,
    marginTop: 2,
    marginBottom: 2
  },
  minPriceFont: {
    fontSize: 18,
    color: "#e26a6a"
  },
  minPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export default FlightItem;
