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
  ScrollView
} from 'react-native';

// import Toast, { DURATION } from 'react-native-easy-toast';
import Toast from '../Toast/Toast';

const SECTIONHEIGHT = 30;
const ROWHEIGHT = 40;
const ROWHEIGHT_BOX = 40;
const totalheight = []; //每个字母对应的城市和字母的总高度

const { width, height } = Dimensions.get('window');

const keyNow = '定位';
const keyLastVisit = '最近';
const keyHot = '热门';

export default class CityIndexListView extends Component {

  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => {
      return sectionID;
    };
    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID][rowID];
    };

    let allCityList = this.props.allCityList;
    let currentCityList = this.props.nowCityList;
    let lastVisitCityList = this.props.lastVisitCityList;
    let hotCityList = this.props.hotCityList;

    // let letterList = this.getSortLetters(allCityList);

    let dataBlob = {};
    dataBlob[keyNow] = currentCityList;
    dataBlob[keyLastVisit] = lastVisitCityList;
    dataBlob[keyHot] = hotCityList;

    allCityList.map(cityJson => {
      let key = cityJson.sortLetters.toUpperCase();
      if (dataBlob[key]) {
        let subList = dataBlob[key];
        subList.push(cityJson);
      } else {
        let subList = [];
        subList.push(cityJson);
        dataBlob[key] = subList;
      }
    });

    let sectionIDs = Object.keys(dataBlob);
    let rowIDs = sectionIDs.map(sectionID => {
      let thisRow = [];
      let count = dataBlob[sectionID].length;
      for (let ii = 0; ii < count; ii++) {
        thisRow.push(ii);
      }

      let eachheight = SECTIONHEIGHT + ROWHEIGHT * thisRow.length;
      if (sectionID === keyHot || sectionID === keyNow || sectionID === keyLastVisit) {
        let rowNum = (thisRow.length % 4 === 0)
          ? (thisRow.length / 4)
          : parseInt(thisRow.length / 4) + 1;
        // console.log('sectionIDs===>' + sectionIDs + ", rowNum=====>" + rowNum);
        eachheight = SECTIONHEIGHT + ROWHEIGHT_BOX * rowNum;
      }
      totalheight.push(eachheight);

      return thisRow;
    });

    // console.log(sectionIDs);
    // console.log(rowIDs);
    // console.log(dataBlob);

    let ds = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      letters: sectionIDs
    };
  }

  getSortLetters(dataList) {
    let list = [];
    for (let j = 0; j < dataList.length; j++) {
      let sortLetters = dataList[j].sortLetters.toUpperCase();
      let exist = false;
      for (let xx = 0; xx < list.length; xx++) {
        if (list[xx] === sortLetters) {
          exist = true;
        }
        if (exist) {
          break;
        }
      }
      if (!exist) {
        list.push(sortLetters);
      }
    }

    return list;
  }

  onCityNameClick(cityJson) {
    this.props.onSelectCity(cityJson);
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

  renderListBox(cityJson, rowId) {
    return (
      <TouchableOpacity key={'list_item_' + rowId} style={styles.rowViewBox} onPress={() => { this.onCityNameClick(cityJson) }}>
        <View style={styles.rowdataBox}>
          <Text style={styles.rowdatatextBox}>{cityJson.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderListRow = (cityJson, sectionID, rowId) => {
    console.log('rowId===>' + rowId + ":" + sectionID + ", cityJson====>" + JSON.stringify(cityJson));
    if (rowId === keyNow || rowId === keyHot || rowId === keyLastVisit) {
      return this.renderListBox(cityJson, rowId);
    }

    return (
      <TouchableOpacity key={'list_item_' + rowId} style={styles.rowView} onPress={() => { this.onCityNameClick(cityJson) }}>
        <View style={styles.rowdata}>
          <Text style={styles.rowdatatext}>{cityJson.name}</Text>
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

  // <Toast ref="toast" position='top' positionValue={200} fadeInDuration={750} fadeOutDuration={1000} opacity={0.8} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F4F4F4',
  },
  listContainner: {
    height: Dimensions.get('window').height,
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
    justifyContent: 'center'
  },
  letter: {
    height: height * 4 / 100,
    width: width * 4 / 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letterText: {
    textAlign: 'center',
    fontSize: height * 1.1 / 50,
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
  rowdata: {
    paddingTop: 10,
    paddingBottom: 2
  },
  rowdatatext: {
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
  rowdataBox: {
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
  rowdatatextBox: {
    textAlign: 'center',
  }
});
