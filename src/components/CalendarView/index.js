/**
 * Created by feiba on 2017/11/17.
 */
/***
 * 日历控件
 */
import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ListView,
} from 'react-native';
import PropTypes from 'prop-types'
import calendarHelper from '../CalendarView/calendarHelper'
import { screen, colorAndFont } from '../../utils'

const itemWidth = screen.width/7-1;
const itemHeight = 68;


export default class CalendarView extends Component {

	static propTypes = {
		monthCount: PropTypes.number,//显示日历月份数
		startDate: PropTypes.object,
	}

	static defaultProps = {
		monthCount: 3,
		startDate: new Date()
	}

	constructor(props) {
		super(props);
		this.state = {
			calendarInfos: []
		}
	}

	getCalendarInfos() {
		let calendarInfos = [];
		let  { monthCount, startDate } = this.props;
		let year = startDate.getFullYear();
		let month = startDate.getMonth();
		for (let i = 0; i < monthCount; i++) {
			let d = new Date(year, month+i, 1);
			let monthInfo = calendarHelper.getOneMonth(d);
			calendarInfos.push(monthInfo);
		}
		return calendarInfos;
	}

	// componentDidMount() {
		// let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		// this.setState({
		// 	calendarInfos:ds.cloneWithRows(this.getCalendarInfos())
		// });
	// }

	//渲染星期头部
	renderHeaderWeek = () => {
		return calendarHelper.getWeeks().map((weekName, index) => {
			return (
				<Text key={index}
				      style={styles.weekText}
				>
					{weekName}
				</Text>)
		})
	}

	//整月item
	renderItemMonth = (monthInfo) => {
		return this.state.calendarInfos.map((month, index) => {
			return (
				<View style={styles.monthContainer}>

				</View>
			)
		})
	}


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.weekHeaderContainer}>
					{this.renderHeaderWeek()}
				</View>
			</View>
		)
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	weekHeaderContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		height: 30,
		backgroundColor: colorAndFont.themeColor,
		justifyContent:'center',
		alignItems:'center'
	},
	weekText: {
		textAlign: 'center',
		color: colorAndFont.whiteColor,
		width: itemWidth,
	},
	monthContainer: {
		container: {
			flexDirection: 'row',
			flexWrap:'wrap'
		}
	}
})