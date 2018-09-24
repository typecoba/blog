/*
이 컴포넌트에서는, 나중에 라이프사이클 메소드와, 커스텀 메소드를 사용해야되기 때문에 클래스 형태로 작성되었습니다.

이제 props 로 받은 값들을 각 input 에 설정하고, 변화가 일어나면 props 로 전달받은 onChangeInput 을 호출해주겠습니다.
제목과 태그의 경우엔 인풋에 onChange 이벤트를 설정하여 값을 설정해줄수있지만, 
CodeMirror 의 경우엔 initializeEditor 함수가 호출 될 때 이벤트를 직접 등록해주어야 합니다.
또한, props 로 받은 markdown 값을 CodeMirror 인스턴스에 반영시켜줘야 하기 때문에, 
componentDidUpdate 부분에서 markdown 값이 바뀌었으면 setValue 를 통하여 내용을 변경해주고, 
이 과정에서 cursor 의 위치가 초기화 될 수 있기 때문에 cursor 를 유지하기 위하여 
cursor 값도 setCursor 를 통하여 설정해줍니다.
 */

import React, {Component} from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';
import CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown'; // 마크다운 문법 색상
// 마크다운 내부에 들어가는 코드 색상
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

// CodeMirror 를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const cx = classNames.bind(styles);

class EditorPane extends Component{

    editor = null // 에디터 ref
    codeMirror = null // CodeMirror 인스턴스
    cursor = null // 에디터의 텍스트 cursor 위치

    initializeEditor = () => {
        this.codeMirror = CodeMirror(this.editor, {
            mode: 'markdown',
            theme: 'monokai',
            lineNumbers: true, // 좌측에 라인넘버 띄우기
            lineWrapping: true // 내용이 너무 길면 다음 줄에 생성
        });
        this.codeMirror.on('change', this.handleChangeMarkdown);
    }

    componentDidMount() {
        this.initializeEditor();
    }

    handleChange = (e) => {
        const {onChangeInput} = this.props;
        const {value, name} = e.target;
        onChangeInput({name, value});
    }

    handleChangeMarkdown = (doc) => {
        const {onChangeInput} = this.props;
        this.cursor = doc.getCursor(); // 텍스트 cursor의 위치를 저장합니다.
        onChangeInput({
            name: 'markdown',
            value: doc.getValue()
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // markdown이 변경되면 에디터의 값도 변경해줍니다.
        // 이 과정에서 텍스트 커서의 위치가 초기화 되기 때문에, 
        // 저장해둔 커서의 위치가 있으면 해당 위치로 설정합니다.
        if(prevProps.markdown !== this.props.markdown){
            const {codeMirror, cursor} = this;
            if(!codeMirror) return;
            codeMirror.setValue(this.props.markdown);
            if(!cursor) return;
            codeMirror.setCursor(cursor);
        }
    }

    render(){
        const {handleChange} = this;
        const {tags, title} = this.props;

        return (
            <div className={cx('editor-pane')}>
                <input className={cx('title')} placeholder="제목을 입력하세요" name="title" value={title} onChange={handleChange}/>
                <div className={cx('code-editor')} ref={ref=>this.editor=ref}></div>
                <div className={cx('tags')}>
                    <div className={cx('description')}>태그</div>
                    <input name="tags" placeholder="태그를 입력하세요 (쉼표로 구분)" value={tags} onChange={handleChange}/>
                </div>
            </div>
        );
    }
}

export default EditorPane;