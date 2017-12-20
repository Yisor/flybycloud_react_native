/*
 *  @File   : ResignRule
 *  @Author : lsl
 *  @Date   : 2017-12-1 18:37:58
 *  @Last Modified   : 2017-12-1 18:37:58
 *  @Desc 退改签政策
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import GridItem from './GridItem';

class ResignRule extends Component {
  static propTypes = {
    ticket: PropTypes.object,
  }

  render() {
    let { ticket } = this.props;
    let rule = ticket.rule;
    return (
      <View>
        <Text style={styles.resignInstr}>退改签说明</Text>
        <GridItem title='舱位' content={ticket.mainClassName} style={styles.gridItem} />
        <GridItem title='退票条件' content={rule.refundPolicy} />
        <GridItem title='更改条件' content={rule.changePolicy} />
        <GridItem title='签转' content={rule.signPolicy} />
        <Text style={styles.promptTxt}>*退改信息仅供参考,以航空公司最新政策为准,具体资费请咨询代理人</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resignInstr: {
    fontSize: 14,
    color: "#323b43",
    margin: 10,
    marginTop: 20
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  promptTxt: {
    fontSize: 11,
    color: "#e26a6a",
    margin: 10,
    marginBottom: 30
  },
});

export default ResignRule;
