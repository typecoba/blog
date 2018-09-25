/**
EditorHeader 컴포넌트에, 리덕스의 상태와 액션 생성 함수를 붙여줍시다. 
왼쪽의 뒤로가기 버튼과, 우측의 글쓰기 버튼에 기능을 붙여주겠습니다. 
왼쪽 버튼이 클릭 됐을 땐, 리액트 라우터에서 뒤로가기를 하게 해주는 history 객체의 goBack 함수를 호출하겠습니다. 
이 과정에서, 해당 컴포넌트에서 리액트 라우터가 전달해주는 props 값을 받아오기 위하여 withRouter 를 불러와서 
컴포넌트를 내보낼 때 감싸주겠습니다. 현재 컴포넌트가 리덕스와의 상태 연결을 위하여 connect 함수로 감싸져있는데, 
connect 와 withRouter 가 중첩되어도 무방합니다.

우측의 버튼에선, 글쓰기 액션을 발생시킨 뒤, postId 값을 받아와서 포스트 주소로 이동시켜줍니다.,

그리고, componentDidMount 가 발생할 때 INITIALIZE 액션을 실행시켜서 에디터의 상태를 초기화 하세요. 
초기화를 하지 않으면 이전에 작성하던 상태가 남아있게 됩니다.
 */

import React, { Component } from 'react';
import EditorHeader from 'components/editor/EditorHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as editorActions from 'store/modules/editor';

class EditorHeaderContainer extends Component {
    componentDidMount() {
        const { EditorActions } = this.props;
        EditorActions.initialize(); // 에디터를 초기화 합니다.
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    handleSubmit = async () => {
        const { title, markdown, tags, EditorActions, history } = this.props;
        const post = {
            title: title,
            body: markdown,
            // 태그 텍스트를 , 로 분리시키고 앞뒤 공백을 지운 후 되는 값을 제거해줍니다.
            tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
        }; 
        try {
            await EditorActions.writePost(post);
            // 페이지를 이동시킵니다. 주의: postId를 상단에서 레퍼런스를 만들지 않고 
            // 이 자리에서 this.props.postId 를 조회해주어야 합니다. (현재의 값을 불러오기 위함)
            history.push(`/post/${this.props.postId}`);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { handleGoBack, handleSubmit } = this;
        return (<EditorHeader onGoBack={handleGoBack} onSubmit={handleSubmit} />);
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags'),
        postId: state.editor.get('postId')
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(withRouter(EditorHeaderContainer))
