import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class UserInfoPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>UserInfoPage</Text>
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

export default UserInfoPage;
