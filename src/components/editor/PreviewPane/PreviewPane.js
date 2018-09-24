/**
 * 컨테이너 컴포넌트를 통하여 전달받은 title 값과 markdown 값을 보여주겠습니다. 
 * title 부분은 기존 텍스트가 있던 부분을 교체하면 되고, 
 * markdown 의 경우엔 MarkdownRender 컴포넌트를 불러와서 props 로 markdown 을 전달해주세요.
 */
import React from 'react';
import styles from './PreviewPane.scss';
import classNames from 'classnames/bind';
import MarkdownRender from 'components/common/MarkdownRender';

const cx = classNames.bind(styles);

const PreviewPane = ({markdown, title}) => (
    <div className={cx('preview-pane')}>
        <h1 className={cx('title')}>{title}</h1>
        <div><MarkdownRender markdown={markdown}/></div>
    </div>
);

export default PreviewPane;