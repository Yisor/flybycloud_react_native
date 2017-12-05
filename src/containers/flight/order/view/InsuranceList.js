import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, CheckBox, ListView, StyleSheet, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import window from '../../../../utils/window';
import insurances from './insurances.json';
import InsuranceItem from './InsuranceItem';

class InsuranceList extends Component {

  static propTypes = {
    onSelect: PropTypes.func,
    datas: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }

  onPressRow(rowData, sectionID, rowID) {
    let { onSelect, datas } = this.props;
    datas[rowID].isChecked = !datas[rowID].isChecked;
    onSelect && onSelect(datas, rowID);
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (<InsuranceItem insurance={rowData} onPressItem={() => this.onPressRow(rowData, sectionID, rowID)} />);
  }

  render() {
    return (
      <ListView
        contentContainerStyle={[styles.contentContainer, this.props.style]}
        dataSource={this.state.dataSource.cloneWithRows(this.props.datas)}
        renderRow={this.renderRow}
        enableEmptySections={true} />
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
  contentContainer: {
    width: window.width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
});

export default InsuranceList;
