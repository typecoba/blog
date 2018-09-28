/**
 포스트를 읽는 페이지에서 상단에 새 포스트 좌측에 두개의 버튼을 추가해주겠습니다. 
 수정 버튼의 경우엔 /editor?postId=ID 링크로 이동하도록 설정하고, 
 삭제의 경우엔 onRemove 라는 함수를 props 로 받아와서 호출하게 설정하겠습니다.
 */
import React, {Component} from 'react';
import Header from 'components/common/Header';
import {withRouter} from 'react-router-dom';

import * as baseActions from 'store/modules/base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class HeaderContainer extends Component {
    handleRemove = () => {
        const {BaseActions} = this.props; // 헷갈리게 Base base 이렇게 표기하는 이유가 뭐냐..
        BaseActions.showModal('remove');
    }

    render(){
        const {handleRemove} = this;
        const {match} = this.props;
        const {id} = match.params;

        return(
            <Header postId={id}
                    onRemove={handleRemove}/>
        );
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(HeaderContainer));