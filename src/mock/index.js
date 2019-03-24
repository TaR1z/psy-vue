import Mock from 'mockjs'
import { getHomeRead, getHomeConsult, getHomeTest } from './response/home'
import { getReadAll } from './response/read'

Mock.mock('/homeRead', 'get', getHomeRead)
Mock.mock('/homeConsult', 'get', getHomeConsult)
Mock.mock('/homeTest', 'get', getHomeTest)
Mock.mock('/readAll', 'get', getReadAll)
