/*
이번 컴포넌트는 전달받은 props 가 꽤 많죠? 
password 의 경우엔 로그인 창에 있는 input 값의 value 로 설정되는 값으로서, 
우리가 나중에 base 모듈에서 상태 관리를 하게 될 것입니다.
error 값의 경우엔 사용자가 잘못된 비밀번호를 입력 했을 경우 에러를 보여주기위한 값입니다.

onCancel 은 닫기버튼 (× 문자는 × 입니다)을 클릭했을때 실행되는 함수이며, 
onLogin 은 로그인 버튼을 눌렀을때 실행되는 함수입니다. 
onChange 와 onKeyPress 는 비밀번호가 입력 될 때 호출되는 함수인데, 
onChange 는 값을 변경시켜주고, onKeyPress 의 경우엔 나중에 우리가 버튼 클릭 뿐만 아니라, 
인풋입력 후 엔터를 눌렀을 때에도 로그인 작업을 수행하기 위하여 설정해주었습니다.
*/

import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';

const cx = classNames.bind(styles);

const LoginModal = ({visible, password, error, onCancel, onLogin, onChange, onKeyPress}) => (
    <ModalWrapper visible={visible}>
        <div className={cx('form')}>
            <div onClick={onCancel} className={cx('close')}>&times;</div>
            <div className={cx('title')}>로그인</div>
            <div className={cx('description')}>관리자 비밀번호를 입력하세요</div>
            <input autoFocus type="password" placeholder="비밀번호 입력" value={password} onChange={onChange} onKeyPress={onKeyPress}/>
            {error && <div className={cx('error')}>로그인 실패</div>}
            <div className={cx('login')} onClick={onLogin}>로그인</div>
        </div>
    </ModalWrapper>
);

export default LoginModal;