import React, { Component } from 'react';
import { View } from 'react-native';

import Overlay from '../../../../components/Overlay';
import CostCenterList from './CostCenterList';

export default class PopupListPicker extends Overlay {
  static CostCenterList = CostCenterList;

  static show(items, selectedIndex, onSelected, options = {}) {
    return super.show(
      <this.CostCenterList
        items={items}
        selectedIndex={selectedIndex}
        onSelected={onSelected}
        {...options}
      />
    );
  }
}
