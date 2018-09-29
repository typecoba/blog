/*
이제 FooterContainer 에서 로그인 상태일때에는 로그아웃을 할 수 있도록 현재 로그인 상태를 Footer 로 전달하세요. 
그리고, handleLoginClick 메소드에서는, 로그인 상태일때에는 로그아웃 API 를 호출하고 새로고침을 하도록 설정해보세요.
*/
import React, {Component} from 'react';
import Footer from 'components/common/Footer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';

class FooterContainer extends Component{
    handleLoginClick = async () => {
        const {BaseActions, logged} = this.props;
        if(logged){
            try{
                await BaseActions.logout();
                window.location.reload(); // 페이지 새로고침
            }catch (e){
                console.log(e);
            }
            return;
        }
        BaseActions.showModal('login');
        BaseActions.initializeLoginModal();
    }

    render(){
        const {handleLoginClick} = this;
        const {logged} = this.props;
        return(
            <Footer onLoginClick={handleLoginClick} logged={logged}/>
        );
    }
}

export default connect(
    (state) => ({
        logged: state.base.get('logged')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(FooterContainer);