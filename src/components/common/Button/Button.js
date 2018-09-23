/*
프로젝트에서 사용되는 버튼 컴포넌트를 만들겠습니다. 
이 컴포넌트는, to 값이 props 로 전달 되었을땐 Link 컴포넌트를 사용하고, 
to 값이 없을 때에는 div 태그를 사용합니다. 여러 종류의 스타일을 가진 버튼 컴포넌트를 만들기 위해서,
theme props 를 받아와서 이에 따라 다른 스타일을 설정하겠습니다. 
Button 컴포넌트를 Generate New Component 를 통하여 common 디렉토리에 생성하고, 
다음 코드들을 작성하세요.
*/

import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

// 전달받은 className, onClick 등의 값들이 rest 안에 들어있습니다.
// JSX 에서 ... 을 사용하면 내부에 있는 값들을 props 로 넣어줍니다.
const Div = ({children, ...rest}) => <div {...rest}>{children}</div>

const Button = ({children, to, onClick, disabled, theme = 'default'}) => {
    // to 값이 존재하면 Link 를 사용하고, 그렇지 않으면 div 를 사용합니다.
    // 비활성화 되어있는 버튼인 경우에도 div 가 사용됩니다.
    const Element = (to && !disabled) ? Link : Div;

    return(
        <Element to={to}
                 className={cx('button', theme, {disabled})}
                 onClick={disabled ? () => null : onClick}>
            {children}
        </Element>
    )
}

export default Button;