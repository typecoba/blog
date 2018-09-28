/*
현재 PostInfo 와 PostBody 에서는 props 로 받은 값을 보여주는 것이 아니라 
우리가 사전에 설정한 텍스트가 보여지고 있습니다. 
텍스트가 들어가는 부분에 우리가 props 로 넣어준 값들을 렌더링 해보세요.

우선, PostInfo 부터 작업을 해볼건데요, 이 컴포넌트에서는 포스트 날짜, 제목, 그리고 태그가 보여지지요. 
이 과정에서, 태그는 배열 형태로 받아와서 Link 배열로 변환하여 렌더링해줍니다.

그리고, 날짜를 텍스트형태로 보여주는 부분에서는, 편의를 위하여 moment 라는 라이브러리를 설치하여 사용하겠습니다. 
이 라이브러리는 날짜를 다양한 형식으로 텍스트변환을 해줍니다. (참조: https://momentjs.com/) 
 */
import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';
import  moment from 'moment';


const cx = classNames.bind(styles);

const PostInfo = ({publishedDate, title, tags}) => (
    <div className={cx('post-info')}>
        <div className={cx('info')}>
            <h1>{title}</h1>
            <div className={cx('tags')}>
                {
                    // tags가 존재하는 경우에만 map을 실행합니다.
                    tags && tags.map(
                        tag => <Link key={tag} to={`/tag/${tag}/1`}>#{tag}</Link>
                    )
                }
            </div>
            <div className={cx('date')}>{moment(publishedDate).format('11')}</div>
        </div>
    </div>
);

export default PostInfo;