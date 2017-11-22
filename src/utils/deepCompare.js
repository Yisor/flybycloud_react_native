/**
 * Created by feiba on 2017/11/21.
 */
import { is } from 'immutable';

export function deepCompare(instance, nextProps, nextState) {
	const thisProps = instance.props || {};
	const thisState = instance.state || {};

	nextProps = nextProps || {};
	nextState = nextState || {};

	if (Object.keys(thisProps).length !== Object.keys(nextProps).length || Object.keys(thisState).length !== Object.keys(nextState).length) {
		console.log('deepCompare length diff');
		return true;
	}

	for (const key in nextProps) {
		if (thisProps[key] !== nextProps[key] || !is(thisProps[key],nextProps[key])) {
			console.log('deepCompare props diff(key):', key);
			return true;
		}
	}

	for (const key in nextState) {
		if (thisState[key] !== nextState[key] || !is(thisState[key],nextState[key])) {
			console.log('deepCompare state diff(key):', key);
			return true;
		}
	}

	return false;
}