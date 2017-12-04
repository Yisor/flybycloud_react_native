import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, CheckBox, ListView, StyleSheet, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import window from '../../../../utils/window';
import insurances from './insurances.json';
import InsuranceItem from './InsuranceItem';

class InsuranceList extends Component {

  static propTypes = {
    onSelect: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
    this.newList = [];
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let tempList = [];
    insurances.map((item) => {
      item['isChecked'] = false;
      tempList.push(item);
    });

    this.setState({ dataSource: this.state.dataSource.cloneWithRows(tempList) });
    this.newList = JSON.parse(JSON.stringify(tempList));
  }

  onPressRow(rowData, sectionID, rowID) {
    let { onSelect } = this.props;
    this.newList[rowID].isChecked = !this.newList[rowID].isChecked;
    onSelect && onSelect(this.newList, rowID);
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (<InsuranceItem insurance={rowData} onPressItem={() => this.onPressRow(rowData, sectionID, rowID)} />);
  }

  render() {
    return (
      <ListView
        contentContainerStyle={[styles.contentContainer, this.props.style]}
        dataSource={this.state.dataSource}
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
