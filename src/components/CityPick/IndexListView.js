'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
  ListView,
  Dimensions,
  ScrollView,
  InteractionManager
} from 'react-native';

import Toast from '../Toast/Toast';

const SECTIONHEIGHT = 30;
const ROWHEIGHT = 40;
const ROWHEIGHT_BOX = 40;
const totalheight = []; //每个字母对应的城市和字母的总高度

const { width, height } = Dimensions.get('window');

let dataBlob = {};
const keyNow = '定位';
const keyLastVisit = '最近';
const keyHot = '热门';
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default class CityIndexListView extends Component {

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
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      letters: []
    };
  }

  componentWillMount() {
    let allCityList = this.props.allCityList;
    let currentCityList = this.props.nowCityList;
    let lastVisitCityList = this.props.lastVisitCityList;
    let hotCityList = this.props.hotCityList;

    dataBlob[keyNow] = currentCityList;
    dataBlob[keyLastVisit] = lastVisitCityList;
    dataBlob[keyHot] = hotCityList;

    for (let letter of letters) {
      dataBlob[letter] = [];
    }

    allCityList.map(city => {
      let key = city.cityPinyin.substr(0, 1).toUpperCase();
      if (dataBlob[key]) {
        dataBlob[key].push(city);
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

      let eachheight = SECTIONHEIGHT + ROWHEIGHT * thisRow.length;
      if (sectionID === keyHot || sectionID === keyNow || sectionID === keyLastVisit) {
        let rowNum = (thisRow.length % 4 === 0) ? (thisRow.length / 4) : parseInt(thisRow.length / 4) + 1;
        eachheight = SECTIONHEIGHT + ROWHEIGHT_BOX * rowNum;
      }
      totalheight.push(eachheight);

      return thisRow;
    });

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        letters: sectionIDs
      });
    });
  }

  onCityClick(city) {
    this.props.onSelectCity(city);
  }

  onScrollTo(index, letter) {
    let position = 0;
    for (let i = 0; i < index; i++) {
      position += totalheight[i]
    }
    this._listView.scrollTo({ y: position });
    Toast.message(letter, 'short', 'center')
  }

  renderRightLetters(letter, index) {
    return (
      <TouchableOpacity key={'letter_idx_' + index} activeOpacity={0.6} onPress={() => { this.onScrollTo(index, letter) }}>
        <View style={styles.letter}>
          <Text style={styles.letterText}>{letter}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderListBox(city, rowId) {
    return (
      <TouchableOpacity key={'list_item_' + rowId} style={styles.rowViewBox} onPress={() => { this.onCityClick(city) }}>
        <View style={styles.rowDataBox}>
          <Text style={styles.rowDataTextBox}>{city.cityName}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderListRow = (city, rowId) => {
    if (rowId === keyNow || rowId === keyHot || rowId === keyLastVisit) {
      return this.renderListBox(city, rowId);
    }

    return (
      <TouchableOpacity key={'list_item_' + rowId} style={styles.rowView} onPress={() => { this.onCityClick(city) }}>
        <View style={styles.rowData}>
          <Text style={styles.rowDataText}>{city.cityName}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderListSectionHeader(sectionData, sectionID) {
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
        <View style={styles.listContainner}>
          <ListView ref={listView => this._listView = listView} contentContainerStyle={styles.contentContainer} dataSource={this.state.dataSource} renderRow={this.renderListRow} renderSectionHeader={this.renderListSectionHeader} enableEmptySections={true} initialListSize={500} />
          <View style={styles.letters}>
            {this.state.letters.map((letter, index) => this.renderRightLetters(letter, index))}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F4F4F4',
  },
  listContainner: {
    height: height,
    marginBottom: 10
  },
  contentContainer: {
    flexDirection: 'row',
    width: width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  letters: {
    position: 'absolute',
    height: height,
    top: 0,
    bottom: 0,
    right: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  letter: {
    height: height * 4 / 145,
    width: width * 4 / 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letterText: {
    textAlign: 'center',
    fontSize: height * 1.1 / 60,
    color: 'gray'
  },
  sectionView: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 30,
    paddingLeft: 10,
    width: width,
    backgroundColor: '#F4F4F4'
  },
  sectionText: {
    color: 'gray',
    fontWeight: 'bold'
  },
  rowView: {
    height: ROWHEIGHT,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 0.5
  },
  rowData: {
    paddingTop: 10,
    paddingBottom: 2
  },
  rowDataText: {
    color: 'gray',
    width: width
  },
  rowViewBox: {
    height: ROWHEIGHT_BOX,
    width: (width - 30) / 4,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowDataBox: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  rowDataTextBox: {
    textAlign: 'center',
  }
});
