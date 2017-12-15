import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Modal, ScrollView, StyleSheet, Alert } from 'react-native';
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
        ))}
      </View>
    );
  }

  renderTicketInfo(flight, ticket, passengers) {
    let totalPerson = passengers.length == 0 ? 1 : passengers.length;
    return (flight && ticket) ?
      <View style={{ marginLeft: 10, marginRight: 10, backgroundColor: '#fff', width: window.width, marginBottom: 20 }}>
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
      </View> : null;
  }

  render() {
    let { flightDetails, returnDetails, passengers } = this.props;
    let { flight, ticket } = flightDetails;
    let backFlight = null;
    let backTicket = null;
    if (returnDetails) {
      let { returnFlight, returnTicket } = returnDetails;
      backFlight = returnFlight;
      backTicket = returnTicket;
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'flex-end', alignItems: 'center', }}>
        {this.renderTicketInfo(flight, ticket, passengers)}
        {this.renderTicketInfo(backFlight, backTicket, passengers)}
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
