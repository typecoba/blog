/*
로그인 모달은 리스트 페이지던 포스트페이지던, 전역적으로 사용되는 모달이기때문에, 우리는 App 에서 렌더링 해주어야 합니다.
지금의 경우엔, 그냥 LoginModalContainer 컴포넌트를 App 에서 바로 렌더링해주어도 무방합니다. 
하지만, 만약에 이렇게 전역적으로 필요해지는 컴포넌트들이 많아진다면, 
App 컴포넌트에 렌더링하게 되는 컴포넌트가 늘어나게 되면서 App 컴포넌트의 render 함수가 복잡해질 수 있습니다.
따라서, 우리는 Base 라는 컨테이너 컴포넌트를 만들어서 그 안에 LoginModalContainer 를 렌더링해주겠습니다. 
Base 를 컨테이너로 만드는 이유는, 우리가 페이지를 새로고침 할 때마다 현재 사용자가 로그인중인지 검증을 하게 되는데,
이 작업을 Base 컴포넌트에서 처리 할 것이기 때문입니다.

현재, 로그인 상태에서 페이지를 새로고침을 하게 된다면, 상태가 초기화 되버립니다. 
그 이유는, 리덕스 스토어 안에 있는 상태는 페이지를 새로 불러오게 된다면 보존되지 않기 때문입니다.

현재 서버 세션상으로는 로그인상태가 유지되어있기 때문에,
우리가 이전에 만든 checkLogin API 를 호출하여 현재 로그인 상태를 확인 후 리덕스 스토어에 반영해봅시다.

이렇게 해주면, 새로고침을 해도 클라이언트쪽에서 로그인 상태가 유지됩니다. 
페이지를 불러오게 되면, checkLogin 이 호출 되면서 서버에 로그인 상태를 요청하고 이에 따라 상태에 반영시켜줍니다.
하지만 이것만으로는 충분하지 않습니다. 그 이유는, 새로고침을 했을 때, 
checkLogin API 가 응답 할 때 까지는 클라이언트에선 로그아웃 상태로 간주하기 때문이죠.
따라서, 사용자가 로그인을 했다면, 새로고침을 해도, checkLogin 이 응답 할 때 까지 임시적으로 로그인 상태를 유지하고 있어야합니다. 
이를 구현하기 위해선, HTML5 의 localStorage 를 이용하면 됩니다. 
localStorage 에 값을 넣으면, 페이지가 새로고침 되거나 브라우저를 껐다 켜도 값이 유지됩니다. 
하지만 주의 할 점은, 값이 문자열 형태로 들어가게 되므로, 만약에 객체, 혹은 숫자, Boolean 등의 값을 넣게 된다면, 
JSON.stringify / JSON.parse 를 사용하거나, 문자열로 취급을 해 주어야 합니다.
자, 임시로 로그인 상태를 설정하기 위하여 TEMP_LOGIN 이라는 액션을 준비해줍시다.
*/

import React, {Component} from 'react';
import LoginModalContainer from 'containers/modal/LoginModalContainer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';

class Base extends Component{
    initialize = async () => {
        // 로그인 상태 확인
        /*
        이렇게 하고나면, 로그인을 했을 때 localStorage 에 로그인 상태를 저장하게 되어 
        이 상태가 존재한다면 checkLogin API 가 응답하기 전부터 로그인중인 것으로 간주합니다.
        그리고, 이는 임시적으로 로그인 상태로 만든 것 뿐이므로, 
        만약에 서버 세션상에서는 로그인 상태가 아니라면 다시 로그인 상태가 비활성화 됩니다.
        */
        const {BaseActions} = this.props;
        if(localStorage.logged ==="true"){
            BaseActions.tempLogin();
        }
        BaseActions.checkLogin();
    }

    componentDidMount(){
        this.initialize();        
    }

    render(){
        return(
            <div>
                <LoginModalContainer/>
                {
                    // 전역적으로 사용되는 컴포넌트들이 있다면 여기서 렌더링 합니다.                    
                }
            </div>
        )
    }
}

export default connect(
    null,
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Base);