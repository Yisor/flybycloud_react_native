/*
 *  @File   : CostCenter
 *  @Author : lsl
 *  @Date   : 2017-12-1 11:8:36
 *  @Last Modified   : 2017-12-1 11:8:36
 *  @Desc: 配送方式
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Overlay from '../../../../components/Overlay';
import window from '../../../../utils/window';

export default class IllegalReasonList extends Overlay.PullView {

  static propTypes = {
    ...Overlay.PullView.propTypes,
    items: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
    onSelected: PropTypes.func, //(item, index)
  };

  onItemPress(itemIndex) {
    let { items, onSelected } = this.props;
    this.close(false);
    onSelected && onSelected(items[itemIndex], itemIndex);
  }

  buildProps() {
    super.buildProps();

    let { items, selectedIndex, children, ...others } = this.props;

    children = (
      <ScrollView style={{ width: window.width }}>
        {items && items.map((item, index) => (
          <TouchableOpacity key={'item' + index} style={styles.rowCenter} onPress={() => this.onItemPress(index)}>
            <Text style={{ fontSize: 14, color: "#333b43", margin: 10 }}>{item.reasonInfo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
    this.props = { items, selectedIndex, children, ...others };
  }
}

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#e1e8ee',
    borderBottomWidth: 1
  }
});

