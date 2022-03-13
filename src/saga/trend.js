import {call, put, takeEvery} from 'redux-saga/effects'
import {trendData} from '../Api'
import { TREND_REQUEST,TREND_SUCCESS,TREND_FAILURE } from '../reduce/trend'
import { INPUT_REQUEST } from '../reduce/inputDefault'

const API = {
  trendAPI : (request_Body) =>{
		return trendData.age(request_Body).catch((e)=>{console.log(e)});
	}
}





function* loadData(action) {
  const trendData = yield call (API.trendAPI,action.body);
  try{
    yield put({type:TREND_SUCCESS, payload : {
			data : trendData.data.results, body : action.body
		}});
    yield put({type:INPUT_REQUEST,payload : action.body})
    alert('그래프를 출력합니다.')
  } catch(e) {
    yield put({type:TREND_FAILURE});
    alert('입력값을 다시 확인해주세요')
  }
}



export default function* trendSaga () {
  yield takeEvery(TREND_REQUEST,loadData);
}