/*
여기서 우리는 SHOW_MODAL 과 HIDE_MODAL 액션을 만들게 됩니다. 
이 액션은, 주어진 payload 값에 따라서 modal Map 내부에 있는 값을 true 혹은 false 로 전환해줍니다.

이 과정에서, 굳이 액션을 두개로 나누지 않고, 
SET_MODAL_VISIBILITY 같은 액션을 만들어서 payload 부분엔 
modalName 과 visible 값을 받아와서 구현해도 무방합니다. 
*/

import { createAction, handleActions } from 'redux-actions';
import {Map} from 'immutable';
import {pender } from 'redux-pender';

// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);

//initial state
const initialState = Map({
    // 모달의 가시성 상태
    modal : Map({ remove:false, login:false})
});


// reducer
export default handleActions({
    [SHOW_MODAL]: (state, action) => {
        const {payload:modalName} = action;
        return state.setIn(['modal', modalName], true);
    },
    [HIDE_MODAL]: (state, action) => {
        const {payload:modalName} = action;
        return state.setIn(['modal', modalName], false);
    }
}, initialState)