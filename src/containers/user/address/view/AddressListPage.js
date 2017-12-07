import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, CheckBox, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { queryAddress } from '../actions';
import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import addresses from './addresses.json';

class AddressListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }

  componentDidMount() {
    this.props.dispatch(queryAddress());
    console.log('测试');
  }

  onPressRow(rowData) {
    Actions.pop({ refresh: ({ 'address': rowData }) });
  }

  renderRow = (rowData) => {
    return (
      <TouchableOpacity style={{ marginTop: 15, marginBottom: 15, marginLeft: 20 }} activeOpacity={0.6} onPress={() => this.onPressRow(rowData)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 13, color: "#323b43" }}>{rowData.receiveName}</Text>
          <Text style={{ fontSize: 13, color: "#323b43" }}>{rowData.receivePhone}</Text>
        </View>
        <Text style={{ marginTop: 15, fontSize: 13, color: "#a0a4a8" }}>
          {`${rowData.receiveProvince}${rowData.receiveCity}${rowData.receiveDistrict}${rowData.receiveAddress}`}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.contentContainer}
        dataSource={this.state.dataSource.cloneWithRows(this.props.addresses)}
        renderRow={this.renderRow}
        enableEmptySections={true}
        renderSeparator={() => <Divider />} />
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
    width: window.width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
});


const select = store => ({
  addresses: store.user.address.addresses,
})
export default connect(select)(AddressListPage);
