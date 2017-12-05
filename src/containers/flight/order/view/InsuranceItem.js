import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, CheckBox, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import window from '../../../../utils/window';

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

  render() {
    let rowData = this.props.insurance;
    return (
      <View style={styles.insuranceView} >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
          <Text numberOfLines={1} style={{ fontSize: 14, color: "#797f85" }}>{rowData.insuranceName}</Text>
          <TouchableOpacity >
            <Text style={{ fontSize: 11, color: "#51a6f0", marginLeft: 5 }}>详细说明</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginRight: 10, width: 100 }}>
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
});

export default InsuranceItem;
