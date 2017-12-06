import React, { Component } from 'react';
import { View, Text, Image, ListView, StyleSheet, InteractionManager, TouchableOpacity } from 'react-native';
import Divider from '../../../components/Divider';
import window from '../../../utils/window';
import auditors from './auditors.json';

class AuditorListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }

  componentWillMount() { }

  componentDidMount() { }

  renderRow = (rowData) => {
    return (
      <View style={styles.rowContainer}>
        <View style={{ width: 1, backgroundColor: '#51a6f0', height: 50 }} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={styles.levelView}>
            <Text style={{ fontSize: 8, marginBottom: 3 }}>{`第${rowData.auditingLevel}级`}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={{ flex: 1 }} />
        </View>
        <View style={styles.nameView}>
          <Text style={styles.userNameTxt}>{rowData.userName}</Text>
          <Text style={styles.departmentName}>{rowData.departmentName}</Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.promptTxt}>您需要经过如下领导的审批方可订票</Text>
        <ListView
          contentContainerStyle={{ flex: 1 }}
          dataSource={this.state.dataSource.cloneWithRows(this.props.audits)}
          renderRow={this.renderRow}
          enableEmptySections={true}
          renderSeparator={() => <Divider />} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  promptTxt: {
    fontSize: 12,
    color: "#e26a6a",
    marginTop: 15,
    marginBottom: 15
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: window.width,
    marginLeft: 10,
    marginRight: 10
  },
  nameView: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: "#51a6f0",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8
  },
  userNameTxt: {
    flex: 1,
    fontSize: 14,
    color: "#51a6f0"
  },
  departmentName: {
    flex: 1,
    fontSize: 11,
    marginLeft: 40
  },
  divider: {
    width: 60,
    backgroundColor: '#51a6f0'
  },
  levelView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

export default AuditorListPage;
