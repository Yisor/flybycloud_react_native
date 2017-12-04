import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';
import { queryAddress } from '../actions';

class AddressListPage extends Component {

  componentDidMount() {
    this.props.dispatch(queryAddress());
    console.log('测试');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>AddressList</Text>
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


const select = store => ({
  addresses: store.addressStore.addresses,
})
export default connect(select)(AddressListPage);
