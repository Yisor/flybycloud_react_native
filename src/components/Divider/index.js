import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class Divider extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: '#e1e8ee',
  },
});

export default Divider;