/*
스토어를 생성하는 함수인 configure 를 구현하겠습니다.
함수를 따로 만드는 이유는, 스토어 생성이 클라이언트에서도 이뤄지지만, 
추후 서버사이드 렌더링을 할 때에도 서버쪽에서 호출해야 되기 때문입니다.
*/

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';


const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

// 개발 모드일때만 Redux Devtools 적용
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

// preloadedState는 추후 서버사이드 렌더링이 되었을 때 전달받는 초기상태입니다.
const configure = (preloadedState) => createStore(reducers, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
));

export default configure;

// 스토어를 생성 할 준비가 끝났습니다. Root 
// 컴포넌트에서 configure 함수를 호출하여 스토어를 만들고, 
// Provider 컴포넌트로 BrowserRouter 를 감싸세요.