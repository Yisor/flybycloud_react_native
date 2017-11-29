import React, { Component } from 'react';
import { View, Text, Image, CheckBox, TextInput, ListView, StyleSheet, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import window from '../../../../utils/window';
import { getPinyinLetter } from '../../../../utils/pinyin';
import Divider from '../../../../components/Divider';
import { get } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import emplist from './emplist.json';
import SearchBox from './SearchBox';

class EmpList extends Component {
  constructor(props) {
    super(props);
    let getSectionData = (dataBlob, sectionID) => {
      return sectionID;
    };
    let getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID][rowID];
    };
    this.state = {
      dataSource: new ListView.DataSource({
        getRowData: getRowData,
        getSectionHeaderData: getSectionData,
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      isSelected: false,
    };
    selected = [];
    dataBlob = {};
  }

  componentWillMount() {
    emplist.map(passenger => {
      passenger['isSelected'] = false;
      let key = getPinyinLetter(passenger.userName).substr(0, 1);
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
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob),
      });
    });

    // console.log(JSON.stringify(dataBlob));
    // get(apiUrl.passengers).then((response) => {
    //   console.log('get返回：' + JSON.stringify(response));
    // });
  }

  onSelected = (datas) => {
    this.props.onSelected(datas);
  }

  renderRow = (data, sectionID, rowID) => {
    return (
      <View style={styles.rowItem}>
        <Text>{data.userName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text>{data.departmentName}</Text>
          <CheckBox
            onValueChange={(value) => {
              dataBlob[sectionID][rowID].isSelected = value;
              value ? selected.push(data) : selected.splice(selected.indexOf(data), 1);
              this.setState({ isSelected: value });
              this.onSelected(selected);
            }}
            value={dataBlob[sectionID][rowID].isSelected} />
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

  onChanegeText = (text) => {
    if (text) {
      this.filterData(text);
    }
  }

  filterData(text) {
    let upperCase = text.toUpperCase();
    alert(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBox onChanegeTextKeyword={this.onChanegeText} />
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
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 5,
    backgroundColor: "#ffffff"
  }
});

export default EmpList;
