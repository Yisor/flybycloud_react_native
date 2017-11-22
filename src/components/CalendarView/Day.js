/**
 * Created by feiba on 2017/11/21.
 */
import React, { Componentm, PropTypes } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import { deepCompare } from '../../utils/deepCompare'

const propTypes = {
	dayInfo: PropTypes.object,
	onPress: PropTypes.func,
	state: PropTypes.oneOf(['disabled','today','selected'])
}

class Day extends Component {
	constructor(props) {
		super(props);
		this.onDayPress = this.onDayPress.bind(this);
	}

	onDayPress() {
		this.props.onPress(this.props.dayInfo);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return deepCompare(this, nextProps, nextState);
	}

	render() {
		return (
			<TouchableOpacity>
				<Text>{this.props.dayInfo.day}</Text>
			</TouchableOpacity>
		);
	}
}

Day.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {

	}
})

export default Day;