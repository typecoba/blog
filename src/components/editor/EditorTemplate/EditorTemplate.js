/*
EditorTemplate 과 EditorPane 은 상태관리가 필요한 컴포넌트들이니, 
컴포넌트를 생성 할 때 클래스형으로 생성하세요.

JSX 형태로 전달받아 사용 할 내용이 3종류가 됩니다. 
3 종류의 JSX 가, 하나의 블록 형태로 붙어있는 것이 아니라 각자 다른 곳에 렌더링 되야 하기 때문에, 
children 을 사용하지 않고, header, editor, preview 라는 props 를 받아서 알맞는 곳에 렌더링해줍니다.
*/

import React, {Component} from 'react';
import styles from './EditorTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class EditorTemplate extends Component{
    state = {
        leftPercentage: 0.5
    }

    // separator 클릭 후 마우스를 움직이면 그에 따라 leftPercentage 업데이트
    handleMouseMove = (e) => {
        this.setState({
            leftPercentage: e.clientX / window.innerWidth
        });
    }

    // 마우스를 땠을 때 등록한 이벤트 제거 
    handleMouseUp = (e) => {
        document.body.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    // seperator 클릭시
    handleSeparatorMouseDown = (e) => {
        document.body.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    render(){
        const {header, editor, preview} = this.props;
        const {leftPercentage} = this.state;
        const {handleSeparatorMouseDown} = this;
        
        // 각 섹션에 flex 값 적용
        const leftStyle = {
            flex: leftPercentage
        };
        const rightStyle = {
            flex: 1 - leftPercentage
        };
        // separator 위치 설정
        const separatorStyle = {
            left: `${leftPercentage * 100}%`
        };

        return (
            <div className={cx('editor-template')}>
                {header}
                <div className={cx('panes')}>
                    <div className={cx('pane', 'editor')}>{editor}</div>
                    <div className={cx('pane', 'preview')}>{preview}</div>
                    <div className={cx('separator')}
                         style={separatorStyle}
                         onMouseDown={handleSeparatorMouseDown}/>
                </div>
            </div>
        );
    }
}

export default EditorTemplate;