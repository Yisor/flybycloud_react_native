import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { get } from '../../service/request';
import apiUrl from '../../constants/apiUrl';

class SelectCityPage extends Component {

  componentDidMount() {
    get(apiUrl.cityList).then((res) => {
      console.log('get返回：' + JSON.stringify(res));
    });;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SelectCityPage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectCityPage;
