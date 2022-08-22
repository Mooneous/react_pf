import { createStore } from 'redux';
import reducers from './reducer';

//saga 미들웨어 import
import createSagaMiddleware from '@redux-saga/core';
//미들웨어에 적용할 saga파일 import
import rootSaga from './saga';

//sagaMiddleware함수 활성화
const sagaMiddleware = createSagaMiddleware();

//store공간을 생성한 다음 전달된 reducers를 저장해서 내보냄
//store생성시 리듀서에 saga미들웨어 적용
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//store에 적용된 sagaMiddleware를 통해서 rootSaga활성화
sagaMiddleware.run(rootSaga);

export default store;
