/* 
editor.js 모듈이 가진 상태와 액션들을 사용하는 컴포넌트인 EditorPaneContainer 를 만들겠습니다.
title, markdown, tags 를 연결해주었고, 
handleChangeInput 이라는 메소드를 만들어서 CHANE_INPUT 액션을 실행하도록 설정했습니다.
*/

import React, {Component} from 'react';
import EditorPane from 'components/editor/EditorPane';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as editorActions from 'store/modules/editor';


/* editorActions와 EditorActions 대소문자 구분을 하는것에대해 잘 모르겠다. */

class EditorPaneContainer extends Component {
    handleChangeInput = ({name,value}) => {
        const {EditorActions} = this.props;
        EditorActions.changeInput({name, value});
    }

    render(){
        const {title, tags, markdown} = this.props;
        const {handleChangeInput} = this;

        return(
            <EditorPane title={title}
                        markdown={markdown}
                        tags={tags}
                        onChangeInput={handleChangeInput}/>
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags')
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(EditorPaneContainer);