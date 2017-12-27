import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, ListView, StyleSheet, CheckBox, ScrollView, Alert, TouchableOpacity } from 'react-native';
import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import Overlay from '../../../../components/Overlay';
import ResignRule from '../../flight/view/ResignRule';
import PassengerListRow from '../../refund/view/PassengerListRow';

let selectedUser;
export default class ResignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
    selectedUser = [];
  }

  onConfirm() {
    if (selectedUser.length > 0) {
      let { detail } = this.props;
      let flightDate = detail.flightDate;
      let fromCity = detail.departure;
      let toCity = detail.destination;
      let isGpTicket = (detail.isGovernmentOrder == 1);
      let title = detail.departureCityName + "-" + detail.destinationCityName;
      let params = { flightDate: '2018-01-16', fromCity, toCity, isOneWay: true, isGpTicket, passengers: selectedUser, orderDetail:detail }
      Actions.changeAirlist({ params });
    } else {
      Alert.alert('请至少选择一名乘客');
    }
  }

  /**
 * 退改签政策
 * @param {机票} ticket 
 */
  showResignRule(ticket) {
    let overlayView = (
      <Overlay.PullView
        style={{ alignItems: 'center', justifyContent: 'center' }}
        side='bottom'
        modal={false}
        ref={v => this.overlayPopView = v}>
        <ResignRule ticket={ticket} />
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  }

  renderTrip() {
    let { detail } = this.props;
    return (
      <View style={styles.tripContainer}>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Text style={{ marginRight: 10 }}>单程</Text>
          <Text>{`${detail.departureCityName}-${detail.destinationCityName}`}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={() => this.showResignRule(detail)}>
          <Text style={{ marginRight: 10 }}>查看改签规则</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderPassenger() {
    let { detail } = this.props;
    let passengers = detail.passengers ? detail.passengers : [];
    return (
      <ListView
        contentContainerStyle={styles.contentContainer}
        dataSource={this.state.dataSource.cloneWithRows(passengers)}
        renderRow={this.renderPassengerRow}
        enableEmptySections={true}
        renderSeparator={() => <Divider />} />
    );
  }

  renderPassengerRow = (rowData) => {
    return (
      <PassengerListRow passenger={rowData} onPress={() => {
        let index = selectedUser.indexOf(rowData);
        index > -1 ? selectedUser.splice(index, 1) : selectedUser.push(rowData);
        console.log('选择的是：' + JSON.stringify(selectedUser));
      }} />
    )
  }

  renderDate() {
    return (
      <TouchableOpacity style={styles.dateContainer} activeOpacity={0.6}>
        <Text style={{ margin: 10, fontSize: 14, color: "#797f85" }}>选择改签日期</Text>
        <Text style={{ margin: 10, fontSize: 12, color: "#323b43" }}>{'2017-12-18'}</Text>
      </TouchableOpacity>
    );
  }

  renderContact() {
    let { detail } = this.props;
    let contact = detail.contact ? detail.contact : {};
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 8 }}>
        <Text style={{ margin: 10, fontSize: 14, color: "#797f85" }}>联系手机</Text>
        <Text style={{ margin: 10, fontSize: 12, color: "#323b43" }}>{contact.phone}</Text>
      </View>
    );
  }

  renderButton() {
    return (
      <View style={{ width: window.width, alignItems: 'center', marginTop: 8 }}>
        <TouchableOpacity style={[styles.blueBtn, { margin: 10 }]} activeOpacity={0.6} onPress={() => this.onConfirm()}>
          <Text style={[{ flex: 1 }, styles.buttonTxt]}>选择航班</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderTrip()}
        {this.renderPassenger()}
        {this.renderDate()}
        {this.renderContact()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    width: window.width,
    backgroundColor: 'white',
  },
  buttonTxt: {
    textAlign: 'center',
    fontSize: 18,
    color: "#797f85",
    marginTop: 12,
    marginBottom: 12,
  },
  blueBtn: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: "#78c0ff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  tripContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#d4d4d4',
    borderBottomWidth: 0.5
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 8
  }
});

