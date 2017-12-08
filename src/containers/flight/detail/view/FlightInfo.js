import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Divider from '../../../../components/Divider';
import { formatTime, getTimeString } from '../../../../utils/timeUtils';

const isStopover = [false, true]; // 是否经停

class FlightInfo extends Component {
  static propTypes = {
    flight: PropTypes.object.isRequired,
  };

  render() {
    const { flight } = this.props;
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
}

const styles = StyleSheet.create({
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
  airportName: {
    fontSize: 14,
    color: "#797f85"
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
  carrierText: {
    fontSize: 9,
    color: "#ffffff",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    marginBottom: 2
  },
});

export default FlightInfo;
