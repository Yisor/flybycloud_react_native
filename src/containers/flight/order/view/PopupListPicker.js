import React, { Component } from 'react';
import { View } from 'react-native';

import Overlay from '../../../../components/Overlay';
import CostCenterList from './CostCenterList';
import ExpressTypeList from './ExpressTypeList';
import IllegalReasonList from './IllegalReasonList';

export default class PopupListPicker extends Overlay {
  static CostCenterList = CostCenterList;
  static IllegalReasonList = IllegalReasonList;
  static ExpressTypeList = ExpressTypeList;

  static showCostCenter(items, selectedIndex, onSelected, options = {}) {
    return super.show(
      <this.CostCenterList
        items={items}
        selectedIndex={selectedIndex}
        onSelected={onSelected}
        {...options}
      />
    );
  }

  static showReason(items, selectedIndex, onSelected, options = {}) {
    return super.show(
      <this.IllegalReasonList
        items={items}
        selectedIndex={selectedIndex}
        onSelected={onSelected}
        {...options}
      />
    );
  }

  static showExpressType(items, selectedIndex, onSelected, options = {}) {
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
