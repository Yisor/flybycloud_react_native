import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import ModalIndicator from '../../../components/ModalIndicator';
import { FLIGHT_QUERY, FLIGHT_QUERY_SUCESS } from './actionTypes';
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
      yield put({ type: FLIGHT_QUERY_SUCESS, data: result });
    } else {
      Alert.alert(result.message);
    }
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

// watch actions and coordinate worker tasks
export function* watchQueryFlight() {
  while (true) {
    const action = yield take(FLIGHT_QUERY);
    console.log('watchQueryFlight' + JSON.stringify(action));
    yield fork(queryFlight, action.data);
  }
}