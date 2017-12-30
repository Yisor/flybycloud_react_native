import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getCalendarTxt } from '../utils/index';
import dateUtils from '../../../../utils/dateUtils';

class CalendarBar extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onPress: PropTypes.func,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    defaultDate: PropTypes.object,
  }

  static defaultProps = {
    minDate: new Date(),
  }

  constructor(props) {
    super(props)
    const activeDate = this.props.defaultDate ? this.props.defaultDate : new Date();
    this.state = { activeDate }
  }

  updateDate(now) {
    this.setState({ activeDate: now })
    let { onChange } = this.props;
    onChange && onChange(now);
  }

  onRightClick = () => {
    let now = this.state.activeDate;
    let { onChange, maxDate } = this.props;
    if (!maxDate) {
      now.setDate(now.getDate() + 1);
      this.updateDate(now);
    } else if (!dateUtils.sameDate(now, maxDate) && maxDate > now) {
      now.setDate(now.getDate() + 1);
      this.updateDate(now);
    }
  }

  onLeftClick = () => {
    let { onChange, minDate } = this.props;
    let nextDate = this.state.activeDate;
    if (!dateUtils.sameDate(nextDate, minDate) && nextDate > minDate) {
      nextDate.setDate(nextDate.getDate() - 1);
      this.updateDate(nextDate);
    }
  }

  onMiddleClick = () => {
    let { onPress } = this.props;
    onPress && onPress();
  }

  render() {
    return (
      <View style={styles.calendar}>
        <TouchableOpacity style={[styles.rowCenter, { marginLeft: 10 }]} activeOpacity={0.6} onPress={this.onLeftClick}>
          <Image style={[styles.arrowImg, { marginRight: 10 }]} resizeMode="contain"
            source={require('../../../../resources/assets/common/arrow_white_icon.png')} />
          <Text style={{ color: 'white' }}>前一天</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.rowCenter, styles.dateView]} activeOpacity={0.6} onPress={this.onMiddleClick}>
          <Text style={{ marginLeft: 10 }}>{getCalendarTxt(this.state.activeDate)}</Text>

          <Image style={{ marginLeft: 10, marginRight: 10 }} resizeMode="contain"
            source={require('../../../../resources/assets/common/vertical_divider.png')} />
          <Image style={{ width: 15, height: 15 }} resizeMode="contain"
            source={require('../../../../resources/assets/plane/plane_calendar.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.rowCenter, { marginRight: 10 }]} activeOpacity={0.6} onPress={this.onRightClick}>
          <Text style={{ color: 'white' }}>后一天</Text>
          <Image style={[styles.arrowImg, { marginLeft: 10 }]} resizeMode="contain"
            source={require('../../../../resources/assets/common/arrow_next.png')} />
        </TouchableOpacity>
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
  calendar: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: "#51a6f0",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateView: {
    backgroundColor: 'white',
    width: 160,
    height: 32,
    borderRadius: 3
  },
  arrowImg: {
    width: 7,
    height: 12,
  }
});

export default CalendarBar;
