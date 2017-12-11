import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, CheckBox, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import window from '../../../../utils/window';
import Overlay from '../../../../components/Overlay';

class InsuranceItem extends Component {
  static propTypes = {
    insurance: PropTypes.object.isRequired,
    onPressItem: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
    };
  }

  onValueChange(item) {
    let { onPressItem } = this.props;
    onPressItem && onPressItem();
  }

  wordLimit(str) {
    return str.length > 10 ? str.substr(0, 10) + '...' : str;
  }

  showPop(type, data) {
    let overlayView = (
      <Overlay.PopView
        style={{ alignItems: 'center', justifyContent: 'center' }}
        type={type}
        modal={false}
        ref={v => this.overlayPopView = v}>
        <View style={styles.popView}>
          <Text style={{ textAlign: 'center', margin: 20, marginBottom: 0 }}>保险明细</Text>
          <Text style={{ padding: 15 }}>{`${data.insuranceName}:${data.insuranceDesc}`}</Text>
          <View style={styles.dividerHoriStyle} />
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ alignItems: 'center', justifyContent: 'center', height: 40 }}
            onPress={() => this.overlayPopView && this.overlayPopView.close()}>
            <Text style={{ color: '#51a6f0', textAlign: 'center', }}>确定</Text>
          </TouchableOpacity>
        </View>
      </Overlay.PopView>
    );
    Overlay.show(overlayView);
  }

  render() {
    let rowData = this.props.insurance;
    return (
      <View style={styles.insuranceView} >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          <Text numberOfLines={1} style={{ fontSize: 14, color: "#797f85" }}>{this.wordLimit(rowData.insuranceName)}</Text>
          <TouchableOpacity onPress={() => this.showPop('zoomIn', rowData)}>
            <Text style={{ fontSize: 11, color: "#51a6f0", marginLeft: 5 }}>详细说明</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginLeft: 10 }}>
          <Text style={{ marginRight: 10, fontSize: 14, color: "#323b43" }}>{`￥${rowData.unitPrice}/份`}</Text>
          <CheckBox
            value={this.state.isChecked}
            onValueChange={(value) => {
              this.setState({ isChecked: value })
              this.onValueChange(rowData)
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  insuranceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15
  },
  popView: {
    justifyContent: "flex-end",
    backgroundColor: '#fff',
    width: window.width * 0.8,
    minWidth: 260,
    minHeight: 120,
    borderRadius: 8,
    alignItems: 'center'
  },
  dividerHoriStyle: {
    height: 1,
    width: window.width * 0.8,
    backgroundColor: "#00000011"
  }
});

export default InsuranceItem;
