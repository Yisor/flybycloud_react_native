import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, CheckBox, StyleSheet, Alert, TouchableOpacity } from 'react-native';

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
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.insuranceView} >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          <Text style={{ fontSize: 14, color: "#797f85" }}>{rowData.insuranceName}</Text>
          <View >
            <Text style={{ fontSize: 11, color: "#51a6f0", marginLeft: 5 }}>详细说明</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 10, fontSize: 14, color: "#323b43" }}>{`￥${rowData.unitPrice}/份`}</Text>
          <CheckBox
            value={this.state.isChecked}
            onValueChange={(value) => {
              this.setState({ isChecked: value })
              this.onValueChange(rowData)
            }}
          />
        </View>
      </TouchableOpacity>
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
