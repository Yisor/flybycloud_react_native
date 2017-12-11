import React, { Component } from 'react';
import { View, Text, Image, ListView, StyleSheet, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { flightDetailQuery } from '../actions';
import Divider from '../../../../components/Divider';
import SegmentedBar from '../../../../components/SegmentedBar';
import FlightInfo from './FlightInfo';

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
    this.isGpTicket = this.props.isGpTicket;
    flight = this.props.flight;
    tickets = flight.tickets;
  }

  componentDidMount() {
    let params = { flightId: flight.flightId, isGpTicket: this.isGpTicket };
    this.props.dispatch(flightDetailQuery(params));
  }

  // 预定
  onBooked(item) {
    Actions.fillOrder({ 'flight': flight, 'ticket': item });
  }

  // 改退签
  onResignOrRefund(item) {
    alert('改退签');
  }

  renderFlight() { return (<FlightInfo flight={flight} />); }

  renderSegmentedBar() {
    let SegmentedBarView = this.isGpTicket ? null :
      <SegmentedBar
        style={{ height: 50, marginTop: 10 }}
        indicatorPosition='bottom'
        indicatorType='boxWidth'
        onChange={(index) => { this.setState({ index: index }) }}>
        <SegmentedBar.Item title='经济舱' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
        <SegmentedBar.Item title='商务舱' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
        <SegmentedBar.Item title='头等舱' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
      </SegmentedBar>;
    return (SegmentedBarView);
  }

  renderFormHeader() {
    let FormHeader = this.isGpTicket ?
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 12, paddingBottom: 12 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: "#999999", marginRight: 20 }}>市场价</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: "#f0b051", marginRight: 98 }}>预估政采价</Text>
          </View>
        </View>
        <Divider />
      </View> : null;
    return (FormHeader)
  }

  renderRowMidView(item) {
    let ChannelInfo = item.channelInfoId ?
      <Text style={{ fontSize: 12, color: "#51a6f0" }}>特价抢票</Text> :
      <Text style={{ fontSize: 12, color: "#ffa400" }}>保证出票</Text>
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {this.isGpTicket ? <Text style={styles.gpPrice}>{`￥${item.price}`}</Text> : ChannelInfo}
      </View>
    )
  }

  renderRow = (item) => {
    let bookBtnColor = item.channelInfoId ? "#51a6f0" : "#f0b051";
    let price = this.isGpTicket ? item.gpPrice : item.price;
    return (
      <View style={styles.rowContainer}>
        <View style={{ marginTop: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 14, color: "#323b43" }}>{item.mainClassName}</Text>
          <TouchableOpacity activeOpacity={0.6} style={{ marginTop: 6 }} onPress={() => this.onResignOrRefund(item)}>
            <Text style={styles.resignOrRefund}>改退签</Text>
          </TouchableOpacity>
        </View>
        {this.renderRowMidView(item)}
        <View style={{ flexDirection: 'row', }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 28 }}>
            <Text style={{ fontSize: 11, color: "#323b43" }}>{`￥${price}`}</Text>
            <Text style={{ fontSize: 10, color: "#e26a6a" }}>{item.quantity < 9 ? `剩余${item.quantity}张` : ''}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.6} style={[styles.preset, { backgroundColor: bookBtnColor }]}
            onPress={() => this.onBooked(item)}>
            <Text style={{ fontSize: 12, color: "#ffffff" }}>预定</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  getListData() {
    let datas = {};
    if (this.isGpTicket) {
      datas = this.props.governmentClass;
    } else {
      if (this.state.index == 0) {
        datas = this.props.economyClass;
      }
      if (this.state.index == 1) {
        datas = this.props.businessClass;
      }
      if (this.state.index == 2) {
        datas = this.props.firstClass;
      }
    }
    return datas;
  }

  renderList() {
    let datas = this.getListData();
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
        {this.renderFormHeader()}
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
  gpPrice: {
    fontSize: 12,
    color: "#999999",
    textDecorationLine: 'line-through'
  }
});


const select = store => ({
  economyClass: store.flight.detail.economyClass,
  businessClass: store.flight.detail.businessClass,
  firstClass: store.flight.detail.firstClass,
  governmentClass: store.flight.detail.governmentClass,
})
export default connect(select)(FlightDetailPage);
