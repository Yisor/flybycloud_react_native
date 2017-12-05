import React, { Component } from 'react';
import { View, Text, Image, ListView, StyleSheet, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { get } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import SegmentedBar from '../../../../components/SegmentedBar';
import { formatTime, getTimeString } from '../../../../utils/timeUtils';

// import flight from './seats.json';

const isStopover = [false, true]; // 是否经停
let dataSet = [];

class FlightDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      index: 0
    };
  }

  componentWillMount() {
    flight = this.props.flight;
    tickets = flight.tickets;
  }

  componentDidMount() {
    // let economyClass = tickets.filter((item) => {
    //   return item.mainClassName == '经济舱';
    // });

    // let businessClass = tickets.filter((item) => {
    //   return item.mainClassName == '商务舱';
    // });

    // let firstClass = tickets.filter((item) => {
    //   return item.mainClassName == '头等舱';
    // });

    // dataSet.push(economyClass);
    // dataSet.push(businessClass);
    // dataSet.push(firstClass);
    // this.setState({ index: 0 });
    this.getHttpData();
  }

  getHttpData() {
    let url = apiUrl.allSeat + this.props.flight.flightId;
    get(`${url}/1`).then((response) => {
      dataSet.push(response);
      this.setState({ index: 0 });
      console.log('get经济舱返回：' + JSON.stringify(response));
    });
    get(`${url}/2`).then((response) => {
      dataSet.push(response);
      console.log('get商务舱返回：' + JSON.stringify(response));
    });
    get(`${url}/3`).then((response) => {
      dataSet.push(response);
      console.log('get头等舱返回：' + JSON.stringify(response));
    });
  }

  // 预定
  onBooked(item) {
    Actions.fillOrder({ 'flight': flight, 'ticket': item });
  }

  // 改退签
  onResignOrRefund(item) {
    alert('改退签');
  }

  renderFlight() {
    return (
      <View>
        <View style={[styles.rowCenter, { marginTop: 20 }]}>
          <Text style={{ fontSize: 18, color: "#323b43" }}>{flight.departureCityName}</Text>
          <Text style={styles.isStopover}>{isStopover[flight.isStopover] ? 经停 : ''}</Text>
          <Text style={{ fontSize: 18, color: "#323b43" }}>{flight.destinationCityName}</Text>
        </View>
        <View style={[styles.rowCenter, { marginTop: 10 }]}>
          <Text style={{ fontSize: 24, color: "#323b43" }}>{formatTime(flight.departureTime)}</Text>
          <Divider style={{ width: 60, marginLeft: 32, marginRight: 32 }} />
          <Text style={{ fontSize: 24, color: "#323b43" }}>{formatTime(flight.destinationTime)}</Text>
        </View>
        <View style={[styles.rowCenter, { marginTop: 10 }]}>
          <Text style={styles.airportName}>{flight.departureAirport}</Text>
          <Text style={styles.flyingTimeText}>{getTimeString(flight.flyingTime)}</Text>
          <Text style={styles.airportName}>{flight.destinationAirport}</Text>
        </View>
        <View style={[styles.rowCenter, { marginTop: 15 }]}>
          <View style={{ borderRadius: 2, backgroundColor: "#36d7b7" }}>
            <Text style={styles.carrierText}>实际承运</Text>
          </View>
          <Text style={styles.flightNumber}>{`${flight.airlineShortName}${flight.flightNumber}`} </Text>
          <Text style={{ fontSize: 11, color: "#797f85" }}>{flight.planeType}</Text>
        </View>
      </View>
    );
  }
     
  renderSegmentedBar() {
    return (
      <SegmentedBar
        style={{ height: 50, marginTop: 10 }}
        indicatorPosition='bottom'
        indicatorType='boxWidth'
        onChange={(index) => { this.setState({ index: index }) }}>
        <SegmentedBar.Item title='经济舱' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
        <SegmentedBar.Item title='商务舱' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
        <SegmentedBar.Item title='头等舱' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
      </SegmentedBar>
    );
  }

  renderRow = (item) => {
    return (
      <View style={styles.rowContainer}>
        <View style={{ marginTop: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 14, color: "#323b43" }}>{item.mainClassName}</Text>
          <TouchableOpacity activeOpacity={0.6} style={{ marginTop: 6 }} onPress={() => this.onResignOrRefund(item)}>
            <Text style={styles.resignOrRefund}>改退签</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {item.channelInfoId ?
            <Text style={{ fontSize: 12, color: "#51a6f0" }}>特价抢票</Text>
            : <Text style={{ fontSize: 12, color: "#ffa400" }}>保证出票</Text>
          }
        </View>
        <View style={{ flexDirection: 'row', }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 28 }}>
            <Text style={{ fontSize: 11, color: "#323b43" }}>{`￥${item.price}`}</Text>
            <Text style={{ fontSize: 10, color: "#e26a6a" }}>{item.quantity < 9 ? `剩余${item.quantity}张` : ''}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.6} style={styles.preset} onPress={() => this.onBooked(item)}>
            <Text style={{ fontSize: 12, color: "#ffffff" }}>预定</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderList() {
    let datas = dataSet.length == 0 ? [] : dataSet[this.state.index];
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(datas)}
        renderRow={this.renderRow}
        enableEmptySections={true}
        renderSeparator={() => <Divider />} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderFlight()}
        {this.renderSegmentedBar()}
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  flightInfo: {
    height: 130,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  preset: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 28,
    borderRadius: 4,
    backgroundColor: "#51a6f0"
  },
  resignOrRefund: {
    fontSize: 10,
    textDecorationLine: "underline",
    color: "#797f85"
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrierText: {
    fontSize: 9,
    color: "#ffffff",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    marginBottom: 2
  },
  flyingTimeText: {
    fontSize: 11,
    color: "#797f85",
    marginLeft: 37,
    marginRight: 37
  },
  flightNumber: {
    fontSize: 11,
    color: "#797f85",
    marginLeft: 10,
    marginRight: 10
  },
  isStopover: {
    fontSize: 11,
    color: "#51a6f0",
    marginLeft: 52,
    marginRight: 52
  },
  barTitleStyle: {
    fontSize: 15,
    color: "#323b43"
  },
  airportName: {
    fontSize: 14,
    color: "#797f85"
  }
});

export default FlightDetailPage;
