/*
 * @Author: lsl 
 * @Date: 2017-11-21 14:48:19 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-21 18:28:09
 */
'use strict';
import Header from './Header';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import CityList from './IndexListView';
import CityJson from './cities.json';
import SelectCity from './SelectCity';

const AllCityList = CityJson.allCityList;
const HotCityList = CityJson.hotCityList;
const LastVisitCityList = CityJson.lastVisitCityList;

export {
  SelectCity,
  SearchBox,
  SearchResult,
  CityList,
  AllCityList,
  HotCityList,
  LastVisitCityList,
};