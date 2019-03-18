import Mock from 'mockjs'
import { getHomeRead, getHomeConsult, getHomeTest } from './response/home'

Mock.mock('/homeRead', 'post', getHomeRead)
Mock.mock('/homeConsult', 'post', getHomeConsult)
Mock.mock('/homeTest', 'post', getHomeTest)
