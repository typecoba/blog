/*
visible 값을 리덕스에서 받아와서 AskRemoveModal 에게 전달해주었으며, 
base 와 post 모듈의 액션들을 미리 연결해놓았습니다. 
그리고, 확인 버튼을 눌렀을 때 실행되는 handleConfirm 과 
취소를 눌렀을 때 실행되는 handleCancel 메소드에 비어있는 함수를 미리 설정해놓고, 
이를 onConfirm / onCancel 이라는 이름으로 AskRemoveModal 에 전달해주었습니다.

액션을 작성 한 후엔, AskRemoveModalContainer 를 withRouter 로 감싸서 
handleConfirm 에서 방금 만든 액션 생성 함수에 현재 포스트 아이디를 파라미터로 넣어서 호출하고, 
삭제요청이 완료 된 후 홈페이지로 주소를 이동시키세요.
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import * as postActions from 'store/modules/post';
import AskRemoveModal from 'components/modal/AskRemoveModal';
import {withRouter} from 'react-router-dom';

class AskRemoveModalContainer extends Component {
    handleCancel = () => {
        const {BaseActions} = this.props;
        BaseActions.hideModal('remove');
    }

    handleConfirm = async () => {
        const {BaseActions, PostActions, history, match} = this.props;
        const {id} = match.params;

        try{
            // 포스트 삭제 후, 모달 닫고 홈페이지로 이동
            await PostActions.removePost(id);
            BaseActions.hideModal('remove');
            history.push('/');
        }catch (e){
            console.log(e);
        }
    }

    render(){
        const {visible} = this.props;
        const {handleCancel, handleConfirm} = this;

        return (
            <AskRemoveModal visible={visible} onCancel={handleCancel} onConfirm={handleConfirm}/>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['modal', 'remove'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(withRouter(AskRemoveModalContainer)); // 뭐지 이건?