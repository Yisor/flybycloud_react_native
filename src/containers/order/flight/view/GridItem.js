import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class GridItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 56, margin: 15, justifyContent: 'center' }}>
            <Text style={{ width: 56, fontSize: 12, color: "#797f85" }}>{this.props.title}</Text>
          </View>
          <View style={{ width: 1, backgroundColor: '#DCD7CD' }} />
          <View style={{ flex: 1, margin: 15, justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, color: "#797f85" }}>{this.props.content}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#DCD7CD',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
});

export default GridItem;
