import React, { Component } from 'react';
import { View, Text, Image, ListView, StyleSheet, InteractionManager, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { flightQuery } from '../action';
const { width, height } = Dimensions.get('window');

class FlightListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }
  componentDidMount() {
    this.props.dispatch(flightQuery(this.props.params));
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.status == "Done") {
  //     // this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.flights) });
  //     return false;
  //   }
  //   return true;
  // }

  renderRow = (rowData) => {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{rowData.departureTime}</Text>
          <Image source={require('../../../../resources/assets/plane/plane_arrow_icon.png')} style={{ width: 44, height: 3 }}></Image>
          <Text>{rowData.destinationTime}</Text>
          <Text>{rowData.minPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{rowData.departureAirport}</Text>
          <Text>{rowData.destinationAirport}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{rowData.airlineShortName}</Text>
          <Text>{rowData.flightNumber}</Text>
          <Text>{rowData.planeType}</Text>
          <Text>{rowData.mealType}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource.cloneWithRows(this.props.flights)}
          renderRow={this.renderRow}
          enableEmptySections={true} />
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
  contentContainer: {
    width: width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
});

const select = store => ({
  flights: store.flightStore.flights,
  status: store.flightStore.status,
})
export default connect(select)(FlightListPage);
