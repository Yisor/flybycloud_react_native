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
import { RETURN_DETAILS } from '../../detail/actionTypes';
import GridItem from './GridItem';
import ResignRule from './ResignRule';
const isStopover = [false, true]; // 是否经停

class FlightInfo extends Component {

  static propTypes = {
    flightDetails: PropTypes.object,
    returnDetails: PropTypes.object,
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

  renderFlightContent(flight, ticket) {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, }}>
          <View style={styles.carrierView}>
            <Text style={styles.carrierTxt}>实际承运</Text>
          </View>
          <Text style={{ fontSize: 11, color: "#797f85" }}>{`${flight.airlineShortName}${flight.flightNumber}`}</Text>
        </View>
        <View style={[styles.rowCenter, { marginTop: 10 }]}>
          <Text style={{ fontSize: 24, color: "#323b43" }}>{formatTime(flight.departureTime)}</Text>
          <View style={{ alignItems: 'center', }}>
            <Text style={{ fontSize: 11, color: "#797f85" }}>{isStopover[flight.isStopover] ? '经停' : ' '}</Text>
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
          <TouchableOpacity activeOpacity={0.6} onPress={() => this.showResignRule(ticket)}>
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
  gridItem: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  promptTxt: {
    fontSize: 11,
    color: "#e26a6a",
    margin: 10,
    marginBottom: 30
  },
  carrierTxt: {
    fontSize: 9,
    color: "#ffffff",
    marginLeft: 5,
    marginRight: 5
  },
  carrierView: {
    borderRadius: 2,
    marginRight: 10,
    backgroundColor: "#f0b051"
  },
  resignInstr: {
    fontSize: 14,
    color: "#323b43",
    margin: 10,
    marginTop: 20
  }
});

export default FlightInfo;
