/*
params 에 id 가 있는 경우 해당 값을 Header 로 전달을 해줍니다. 
Header 컴포넌트를 열어서, postId 를 전달 받았을 경우에 두 버튼이 보여지도록 설정하세요.
*/
import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Header = ({postId, logged, onRemove}) => (
    <header className={cx('header')}>
        <div className={cx('header-content')}>
            <div className={cx('brand')}>
                <Link to="/">reactBlog</Link>
            </div>
            {logged && <div className={cx('right')}>
                
                {// flex를 유지하기 위해 배열 형태로 렌더링 합니다.
                    postId && [
                        <Button key="edit" theme="outline" to={`/editor?id=${postId}`}>수정</Button>,
                        <Button key="remove" theme="outline" onClick={onRemove}>삭제</Button>
                    ]
                }
                <Button theme="outline" to="/editor">새 포스트</Button>
            </div>}
        </div>
    </header>
);

export default Header;