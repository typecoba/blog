/**
getPostList API 를 호출 할 때 필요한 액션과, 상태 관리 로직들을 list.js 모듈에 작성하겠습니다. 
이 모듈의 상태에는, 포스트 목록 데이터가 들어있는 posts 값과, 마지막 페이지를 알려주는 lastPage 값이 들어있습니다.

우리가 이전에 이 API 를 만들 때, Last-Page 라는 커스텀 HTTP 헤더를 넣어서 응답을 하도록 코드를 작성했는데요, 
axios 에서 헤더를 읽어올 때는, 소문자로 읽어오게 되니, action.payload.headers[‘last-page’] 값을 읽어오면 되겠습니다. 
추가적으로 해당 값은 문자열 형태로 들어오니 이 값을 parseInt 를 통하여 숫자로 변환하세요.
 */

import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';


// action types
const GET_POST_LIST = 'list/GET_POST_LIST';

// action creators
export const getPostList = createAction(GET_POST_LIST, api.getPostList, meta => meta);

//initial state
const initialState = Map({
    posts: List(),
    lastPage: null
});


// reducer
export default handleActions({
    ...pender({
        type: GET_POST_LIST,
        onSuccess: (state, action) => {
            const {data:posts} = action.payload;
            const lastPage = action.payload.headers['last-page'];
            return state.set('posts', fromJS(posts))
                        .set('lastPage', parseInt(lastPage));
        }
    })
}, initialState)