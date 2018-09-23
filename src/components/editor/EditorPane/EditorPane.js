/*
이 컴포넌트에서는, 나중에 라이프사이클 메소드와, 커스텀 메소드를 사용해야되기 때문에 클래스 형태로 작성되었습니다.
 */

import React, {Component} from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class EditorPane extends Component{
    render(){
        return (
            <div className={cx('editor-pane')}>
                <input className={cx('title')} placeholder="제목을 입력하세요" name="title"/>
                <div className={cx('code-editor')}></div>
                <div className={cx('tags')}>
                    <div className={cx('description')}>태그</div>
                    <input name="tags" placeholder="태그를 입력하세요 (쉼표로 구분)"/>
                </div>
            </div>
        );
    }
}

export default EditorPane;