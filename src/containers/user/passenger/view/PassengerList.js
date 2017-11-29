import React, { Component } from 'react';
import { View, Text, Image, ListView, CheckBox, StyleSheet, InteractionManager, Alert, TouchableOpacity, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Divider from '../../../../components/Divider';
import window from '../../../../utils/window';
import { getPinyinLetter } from '../../../../utils/pinyin';
import { get } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import passengers from './passengers.json';

let dataBlob = {};

class PassengerList extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => {
      return sectionID;
    };
    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID][rowID];
    };
    this.state = {
      dataSource: new ListView.DataSource({
        getRowData: getRowData,
        getSectionHeaderData: getSectionData,
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      index: 0
    };
  }

  componentWillMount() {
    passengers.map(passenger => {
      let key = getPinyinLetter(passenger.name).substr(0, 1);
      if (dataBlob[key]) {
        dataBlob[key].push(passenger);
      } else {
        let subList = [];
        subList.push(passenger);
        dataBlob[key] = subList;
      }
    })
  }

  componentDidMount() {
    let sectionIDs = Object.keys(dataBlob);
    let rowIDs = sectionIDs.map(sectionID => {
      let thisRow = [];
      let count = dataBlob[sectionID].length;
      for (let i = 0; i < count; i++) {
        thisRow.push(i);
      }

      return thisRow;
    });

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      });
    });
    console.log(JSON.stringify(dataBlob));

    // get(apiUrl.passengers).then((response) => {
    //   console.log('get返回：' + JSON.stringify(response));
    // });
  }

  renderRow(data, sectionID, rowID) {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 15, marginBottom: 15 }}>
        <Text>{data.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text>{data.isEmployee ? '本企业员工' : ''}</Text>
          <CheckBox />
        </View>
      </View>
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.sectionText}>
          {sectionData}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          enableEmptySections={true}
          initialListSize={500}
          renderSeparator={() => <Divider style={{ marginLeft: 10 }} />} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    backgroundColor: 'white',
  },
  sectionView: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 30,
    paddingLeft: 10,
    width: window.width,
    backgroundColor: '#F4F4F4'
  },
  sectionText: {
    color: 'gray',
    fontWeight: 'bold'
  },
});

export default PassengerList;
