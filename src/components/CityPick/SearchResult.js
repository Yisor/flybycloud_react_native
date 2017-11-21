'use strict';
import React, { Component } from 'react';
import {
  Alert,
  View,
  ListView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    };
  }

  onCityClick(cityJson) {
    this.props.onSelectCity(cityJson);
  }

  renderRow = (cityJson) => {
    let keyword = this.props.keyword;
    let keyText = (<Text style={{ color: 'red' }}>{keyword}</Text>);

    let name = '';
    if (cityJson.cityName.indexOf(keyword) === 0) {
      name = (<Text>{keyText}{cityJson.cityName.replace(keyword, '')}</Text>);
    } else {
      name = (<Text>{cityJson.cityName}</Text>);
    }

    return (
      <TouchableOpacity
        key={'list_item_' + cityJson.id}
        style={styles.rowView}
        onPress={() => { this.onCityClick(cityJson) }}>
        <View style={styles.rowdata}>
          <Text style={styles.rowdatatext}>{name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    console.log(this.props.searchResultList);
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          contentContainer={styles.contentContainer}
          dataSource={this.state.ds.cloneWithRows(this.props.searchResultList)}
          renderRow={this.renderRow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexDirection: 'row',
    width: width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  rowView: {
    height: 40,
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
  }
});
