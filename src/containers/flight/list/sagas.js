import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import ModalIndicator from '../../../components/ModalIndicator';
import { FLIGHT_QUERY, FLIGHT_QUERY_SUCESS } from './actionTypes';
import * as TYPES from './actionTypes';
import { get } from '../../../service/request';
import apiUrl from '../../../constants/api';

const mockData = [
  {
    "flightId": "2017-12-2306450925CA1701HGHPEK",
    "flightDate": "2017-12-23",
    "departureCityName": "杭州",
    "departureCityCode": "HGH",
    "departureTime": "0645",
    "departureAirport": "杭州萧山",
    "departureTerminal": " ",
    "destinationCityName": "北京",
    "destinationCityCode": "PEK",
    "destinationTime": "0925",
    "destinationAirport": "首都机场",
    "destinationTerminal": "T3",
    "isStopover": 0,
    "stopoverInfo": null,
    "flyingTime": "02:40",
    "airlineCode": "CA",
    "airlineShortName": "中国国航",
    "flightNumber": "CA1701",
    "planeType": "32A",
    "mealType": "5",
    "minPrice": 653,
    "tickets": null,
    "isShare": "0",
    "mainFlightNumber": null,
    "mainAirlineCode": null,
    "mainAirlineShortName": null,
    "departureAirportCode": "HGH",
    "destinationAirportCode": "PEK",
    "seatType": "1"
  }];

export function* queryFlight(params) {
  try {
    console.log(JSON.stringify(params));
    ModalIndicator.show();
    let baseUrl = params.isGpTicket ? apiUrl.gptickets : apiUrl.flightTicket;
    let url = baseUrl + params.flightDate + "/" + params.fromCity + "/" + params.toCity;
    const result = yield call(get, url);
    // const result = mockData;
    ModalIndicator.hide();
    // console.log(JSON.stringify(result));
    if (Array.isArray(result)) {
      yield put({ type: TYPES.FLIGHT_QUERY_SUCESS, data: result });
    } else {
      Alert.alert(result.message);
    }
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* orderByTimeDesc(params) {
  try {
    let temp = JSON.parse(JSON.stringify(params));
    const result = temp.sort(compareUp("departureTime"))
    yield put({ type: TYPES.FLIGHT_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* orderByPriceDesc(params) {
  try {
    let temp = JSON.parse(JSON.stringify(params));
    const result = temp.sort((a, b) => { return a.minPrice - b.minPrice })
    yield put({ type: TYPES.FLIGHT_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* queryAirline() {
  try {
    const result = yield call(get, apiUrl.airlines);
    let tempList = [];
    result.map((item) => {
      if (!item['isCheck']) {
        item['isCheck'] = false;
      }
      tempList.push(item);
    });
    tempList.unshift( { airlineShortName: "不限", isCheck: true });
    yield put({ type: TYPES.AIRLINE_QUERY_SUCESS, data: tempList });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* watchQueryFlight() {
  while (true) {
    const action = yield take(TYPES.FLIGHT_QUERY);
    console.log('watchQueryFlight' + JSON.stringify(action));
    yield fork(queryFlight, action.data);
  }
}

export function* watchTimeDesc() {
  while (true) {
    const action = yield take(TYPES.TIME_DESC_ORDER);
    yield fork(orderByTimeDesc, action.data);
  }
}

export function* watchPriceDesc() {
  while (true) {
    const action = yield take(TYPES.PRICE_DESC_ORDER);
    yield fork(orderByPriceDesc, action.data);
  }
}

export function* watchQueryAirline() {
  while (true) {
    const action = yield take(TYPES.AIRLINE_QUERY);
    yield fork(queryAirline);
  }
}

// 升序排序
function compareUp(propertyName) {
  return (a, b) => {
    let v1 = a[propertyName];
    let v2 = b[propertyName];
    return v1.localeCompare(v2);
  }
}


export default function* flightListSaga() {
  yield [
    fork(watchQueryFlight),
    fork(watchTimeDesc),
    fork(watchPriceDesc),
    fork(watchQueryAirline)
  ];
}