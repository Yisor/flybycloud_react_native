/**
 * Created by feiba on 2017/11/22.
 */

import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	Text
} from 'react-native'

import CalendarView from '../../components/CalendarView'

export default class CalendarPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<CalendarView />
		)
	}
}