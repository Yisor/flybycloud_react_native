import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Modal, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Divider from '../../../../components/Divider';
import window from '../../../../utils/window';

class CostDetail extends Component {
  // static propTypes = {
  //   flight: PropTypes.object.isRequired,
  //   ticket: PropTypes.object.isRequired,
  //   passengers: PropTypes.array.isRequired,
  // };

  renderInsurances(totalPerson) {
    let { insurances } = this.props;
    return (
      <View>
        {insurances.map((item, index) => (
          <View key={'item' + index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ fontSize: 14, color: "#323b43", width: window.width / 2 }}>{item.insuranceName}</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 10, color: "#e26a6a" }}>{`￥${item.unitPrice}`}</Text>
              <Text style={{ fontSize: 14, color: "#323b43" }}>{`x${totalPerson}人`}</Text>
            </View>
          </View>
        ))
        }
      </View>
    );
  }

  render() {
    let { flight, ticket, passengers, insurances } = this.props;
    let totalPerson = passengers.length == 0 ? 1 : passengers.length;
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={{ fontSize: 15, color: "#323b43", marginTop: 15, }}>
          {`${flight.airlineShortName}${flight.flightNumber}`}
        </Text>
        <Divider style={{ marginTop: 15, marginBottom: 15, backgroundColor: 'gray' }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ flex: 1, fontSize: 14, color: "#323b43" }}>成人票</Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 10, color: "#e26a6a" }}>{`￥${ticket.price}`}</Text>
            <Text style={{ fontSize: 14, color: "#323b43" }}>{`x${totalPerson}人`}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', }}>
          <Text style={{ flex: 1, fontSize: 14, color: "#323b43" }}>机建燃油</Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 10, color: "#e26a6a" }}>{`￥${ticket.buildFee + ticket.oilFee}`}</Text>
            <Text style={{ fontSize: 14, color: "#323b43" }}>{`x${totalPerson}人`}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', }}>
          <Text style={{ flex: 1, fontSize: 14, color: "#323b43" }}>服务费</Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 10, color: "#e26a6a" }}>{`￥${ticket.buildFee}`}</Text>
            <Text style={{ fontSize: 14, color: "#323b43" }}>{`x${totalPerson}人`}</Text>
          </View>
        </View>
        <Divider style={{ marginTop: 15, marginBottom: 15, backgroundColor: 'gray' }} />
        {this.renderInsurances(totalPerson)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CostDetail;
