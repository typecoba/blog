/**
 모달은, 기본 상태에선 보여지지 않고, 유저가 삭제 버튼을 눌렀을 때만 보여져야 합니다.
따라서, 우리는 이 컴포넌트가 어떤 상황에 보여져야 할 지 설정을 해주어야 합니다. 
이를 구현하기 위해 우선 ModalWrapper 컴포넌트에서 visible 이란 props 를 받아와서 
상황에 따라 null 을 구현하도록 렌더링 함수를 수정하세요.

이 과정에서, startAnimation 메소드를 만들고, 
componentDidUpdate 에서 visible 값이 바뀔 때 마다 이 메소드를 호출하도록 설정합니다. 
startAnimation 에서는, 호출 시 내부 state 인 animate 값을 true 로 설정하고, 
250ms 초 뒤 false 로 다시 설정합니다.

animate 가 true 일 때에는, visible 값에 따라서 ‘enter’ 혹은 ‘leave’ 를 배경화면과 모달에 클래스로 넣어주며, 
애니메이션이 진행되고 있는 동안에는 컴포넌트가 화면에서 사라지지 않도록 
visible 값과 animate 값이 둘다 false 일 때에만 null 을 리턴하도록 설정 되었습니다.
 */

import React, {Component} from 'react';
import styles from './ModalWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ModalWrapper extends Component {
    state = { animate: false}

    startAnimation = () => {
        // animate 값을 true 로 설정 후 
        this.setState({ animate: true });
        // 250ms 이후 다시 false로 설정
        setTimeout(()=>{
            this.setState({animate:false});
        },250)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.visible !== this.props.visible){
            this.startAnimation();
        }
    }

    render () {
        const {children, visible} = this.props;
        const {animate} = this.state;

        // visible과 animate값 둘다 false 일때만 null 리턴
        if(!visible && !animate) return null;

        // 상태에 따라 애니메이션 설정
        const animation = animate && (visible ? 'enter' : 'leave');

        return(                    
        <div>
            <div className={cx('gray-background', animation)}/>
            <div className={cx('modal-wrapper')}>
                <div className={cx('modal', animation)}>
                    {children}
                </div>
            </div>
        </div>
        );
    }
}
export default ModalWrapper;