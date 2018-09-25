import axios from 'axios';

export const writePost = ({title, body, tags}) => axios.post('/api/posts', {title, body, tags});

// 포스트를 읽는 기능을 구현하는 것은, 매우 간단합니다. 우리가 이전에 만든 /api/posts/:id API 를 호출하여 데이터를 받아온뒤 post 모듈이 지닌 상태에 넣어주면 됩니다.
export const getPost = (id) => axios.get(`/api/posts/${id}`);