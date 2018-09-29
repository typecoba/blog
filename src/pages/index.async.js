/*
비동기 라우트 인덱스 파일인 index.async.js 파일을 만드세요.
*/

import asyncComponent from 'lib/asyncComponent';

export const ListPage = asyncComponent(()=>import('./ListPage'));
export const PostPage = asyncComponent(()=>import('./PostPage'));
export const EditorPage = asyncComponent(()=>import('./EditorPage'));
export const NotFoundPage = asyncComponent(()=>import('./NotFoundPage'));