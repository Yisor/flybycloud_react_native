import React, { Component } from 'react';
import { View } from 'react-native';

import Overlay from '../../../../components/Overlay';
import ExpressTypeList from './ExpressTypeList';

export default class ExpressTypePicker extends Overlay {
  static ExpressTypeList = ExpressTypeList;

  static show(items, selectedIndex, onSelected, options = {}) {
    return super.show(
      <this.ExpressTypeList
        items={items}
        selectedIndex={selectedIndex}
        onSelected={onSelected}
        {...options}
      />
    );
  }
}
