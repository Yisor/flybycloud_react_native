import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Actions } from 'react-native-router-flux'

export default class CustomNavBar extends React.Component {

  renderLeft() {
    return (
      <TouchableOpacity
        onPress={() => console.log('Hamburger button pressed')}
        style={[styles.navBarItem, { paddingLeft: 10 }]}>
        <Image
          style={{ width: 30, height: 50 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    )
  }

  renderMiddle() {
    return (
      <View style={styles.navBarTitle}>
        <Text style={styles.navBarTitleTxt}>{this.props.title}</Text>
      </View>
    )
  }

  renderRight() {
    return (
      <View style={[styles.navBarItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
        <TouchableOpacity
          onPress={() => console.log('Share')}
          style={{ paddingRight: 10 }}>
          <Image
            style={{ width: 30, height: 50 }}
            resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Search')}
          style={{ paddingRight: 10 }}>
          <Image
            style={{ width: 30, height: 50 }}
            resizeMode="contain" />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.container]} >
        {this.renderLeft()}
        {this.renderMiddle()}
        {this.renderRight()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: (Platform.OS === 'ios') ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 20,
  },
  navBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navBarTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarTitleTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})