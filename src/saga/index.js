import { all, call } from 'redux-saga/effects'
import trend from './trend'

export default function* rootSaga() {
  yield all ([
    call(trend)
  ])
}