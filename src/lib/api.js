import axios from 'axios';
import queryString from 'query-string';

export const writePost = ({title, body, tags}) => axios.post('/api/posts', {title, body, tags});

// 포스트를 읽는 기능을 구현하는 것은, 매우 간단합니다. 우리가 이전에 만든 /api/posts/:id API 를 호출하여 데이터를 받아온뒤 post 모듈이 지닌 상태에 넣어주면 됩니다.
export const getPost = (id) => axios.get(`/api/posts/${id}`);

/*
이 작업을 하기 위해선, query-string 라이브러리를 사용해야합니다. 
이 라이브러리를 이전에 리액트 라우터를 배울 때 사용해봤었지요? 
이 라이브러리로 문자열 형태의 URL 쿼리를 객체 형태로 변환 할 수 있고, 
반대로 객체형태를 문자열 형태로 변환 할 수도 있답니다.
 */
export const getPostList = ({tag,page}) => axios.get(`/api/posts/?${queryString.stringify({tag,page})}`);
