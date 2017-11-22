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

const propTypes = {

}

const defaultProps = {

}


class CalendarView extends Component {

	constructor(props) {
		super(props);
		// 初始状态
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>

			</View>
		)
	}

}


CalendarView.propTypes = propTypes;
CalendarView.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'blue'
	}
})