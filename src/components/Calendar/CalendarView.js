/**
 * Created by feiba on 2017/11/17.
 */
/***
 * 日历控件
 */
import React, { Component, PropTypes } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from 'react-native'

export default class CalendarView extends Component {
	static propTypes = {
		weeksHeaderRowStyle: View.propTypes.style,

	}

	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {};
	}

	renderWeeksHeader() {

	}

}