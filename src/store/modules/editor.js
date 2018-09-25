/*
이제, Editor 에서 작성되는 제목, 내용, 그리고 태그들의 상태를 리덕스에서 관리하겠습니다. 
리덕스의 모듈 중 editor.js 를 다음과 같이 수정하세요.

함수를 액션화 해봅시다. 
WRITE_POST 라는 액션 이름을 만들고, 이를 위한 액션 생성 함수를 만드세요. 
API 요청이 성공하였을 때, 서버에서 응답하는 _id 값의 editor 모듈의 postId 값에 넣겠습니다.
*/
import { createAction, handleActions } from 'redux-actions';
import {Map} from 'immutable';
import {pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);

//initial state
const initialState = Map({
    title: '',
    markdown: '',
    tags: '',
    postId: null
});


// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) => {
            const {_id} = action.payload.data;
            return state.set('postId', _id);
        }
    })
}, initialState)