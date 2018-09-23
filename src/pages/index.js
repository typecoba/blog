/*
프로젝트에서 필요한 라우트에서 사용 할 페이지 컴포넌트들을 사전 생성 해주겠습니다. 
이 프로젝트에서는, 총 6 종류의 라우트가 존재합니다.

1.홈
2.포스트 목록
3.포스트 목록 (태그 설정)
4.포스트 읽기
5.에디터
6.404 페이지
여기서, 1번, 2번, 3번 컴포넌트는 동일한 컴포넌트를 공유합니다. 
모두 포스트 목록을 보여주지만, 서로 다른 설정으로 보여줍니다.
 */

export {default as ListPage} from './ListPage';
export {default as PostPage} from './PostPage';
export {default as EditorPage} from './EditorPage';
export {default as NotFoundPage} from './NotFoundPage';
// 이제 이 컴포넌트들을 불러와서 App 컴포넌트에서 라우트를 적용하세요.