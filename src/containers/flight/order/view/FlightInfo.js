/*
 *  @File   : FlightInfo
 *  @Author : lsl
 *  @Date   : 2017-12-1 14:30:19
 *  @Last Modified   : 2017-12-1 14:30:19
 *  @Desc 航班信息
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, Modal, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import Overlay from '../../../../components/Overlay';
import { formatTime, getTimeString } from '../../../../utils/timeUtils';
const isStopover = [false, true]; // 是否经停

class FlightInfo extends Component {

  static propTypes = {
    flightDetails: PropTypes.object.isRequired,
    returnDetails: PropTypes.object,
  };

  showPop(ticket) {
    let policy = ticket.policy;
    let overlayView = (
      <Overlay.PopView
        style={{ alignItems: 'center', justifyContent: 'center' }}
        type='zoomIn'
        modal={false}
        ref={v => this.overlayPopView = v}>
        <View style={{ backgroundColor: '#fff', width: window.width * 0.8, minHeight: 180, borderRadius: 8, justifyContent: 'center', }}>
          <Text style={{ margin: 20 }}>退改签说明</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginLeft: 20, marginRight: 20 }}>退票条件</Text>
            <Text style={{ paddingRight: 20, width: window.width * 0.56 }}>{policy.refundPolicy}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ paddingLeft: 20, marginRight: 20, }}>改签条件</Text>
            <Text style={{ paddingRight: 20, width: window.width * 0.56 }}>{policy.changePolicy}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
            <Text style={{ marginLeft: 20, marginRight: 20 }}>签转政策</Text>
            <Text style={{ paddingRight: 20, width: window.width * 0.56 }}>{policy.signPolicy}</Text>
          </View>
        </View>
      </Overlay.PopView>
    );
    Overlay.show(overlayView);
  }

  renderFlightContent(flight, ticket) {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, }}>
          <View style={{ borderRadius: 2, marginRight: 10, backgroundColor: "#f0b051" }}>
            <Text style={{ fontSize: 9, color: "#ffffff", marginLeft: 5, marginRight: 5 }}>实际承运</Text>
          </View>
          <Text style={{ fontSize: 11, color: "#797f85" }}>{`${flight.airlineShortName}${flight.flightNumber}`}</Text>
        </View>
        <View style={[styles.rowCenter, { marginTop: 10 }]}>
          <Text style={{ fontSize: 24, color: "#323b43" }}>{formatTime(flight.departureTime)}</Text>
          <View style={{ alignItems: 'center', }}>
            <Text style={{ fontSize: 11, color: "#797f85" }}>{isStopover[flight.isStopover] ? 经停 : ' '}</Text>
            <Divider style={{ width: 60, marginLeft: 32, marginRight: 32, marginTop: 5, marginBottom: 5 }} />
            <Text style={{ fontSize: 11, color: "#797f85" }}>{getTimeString(flight.flyingTime)}</Text>
          </View>
          <Text style={{ fontSize: 24, color: "#323b43" }}>{formatTime(flight.destinationTime)}</Text>
        </View>
        <View style={[styles.rowCenter, { marginTop: 5 }]}>
          <Text style={{ fontSize: 14, color: "#797f85", marginRight: 124 }}>{flight.departureAirport}</Text>
          <Text style={{ fontSize: 14, color: "#797f85" }}>{flight.destinationAirport}</Text>
        </View>
        <View style={[styles.rowCenter, { marginTop: 10 }]}>
          <Text style={{ fontSize: 11, color: "#797f85" }}>{flight.planeType}</Text>
          <Text style={{ marginLeft: 5, marginRight: 5 }}>|</Text>
          <Text style={{ fontSize: 11, color: "#797f85" }}>{ticket.mainClassName}</Text>
        </View>
        <Divider style={{ marginTop: 10, borderStyle: "solid", }} />
        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 11, color: "#797f85", marginRight: 20 }}>{`成人票价￥${ticket.price}`}</Text>
            <Text style={{ fontSize: 11, color: "#797f85" }}>{`机建燃油￥${ticket.buildFee + ticket.oilFee}`}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.6} onPress={() => this.showPop(ticket)}>
            <Text style={{ fontSize: 11, color: "#51a6f0" }}>查看退改签</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderFlightInfo() {
    let { flight, ticket } = this.props.flightDetails;
    return (
      <View style={{ backgroundColor: "white", borderRadius: 5, }}>
        {this.renderFlightContent(flight, ticket)}
      </View>
    );
  }

  renderReturnFlightInfo() {
    let { returnDetails } = this.props;
    if (returnDetails) {
      let { flight, ticket } = returnDetails;
      return (
        <View style={{ backgroundColor: "white", borderRadius: 5, }}>
          <Divider style={{ borderStyle: "solid" }} />
          {this.renderFlightContent(flight, ticket)}
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={{ width: window.width, backgroundColor: "#51a6f0" }}>
        <View style={{ backgroundColor: "white", borderRadius: 5, margin: 10 }}>
          {this.renderFlightInfo()}
          {this.renderReturnFlightInfo()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlightInfo;
