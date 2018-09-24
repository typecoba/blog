/*
코드에 색상을 입혀주려면, Prismjs 를 사용해주어야 합니다.
Prismjs 관련 코드를 불러온 다음에, Prism.highlightAll() 함수를 호출하면 
화면상에 있는 코드블록에 스타일이 입혀집니다.
이 함수는, 마크다운이 변환되어 html 이 렌더링 된 다음에 반영되어야 합니다. 
따라서, componentDidUpdate 에서 state 값이 바뀔 때 이 코드를 호출해주세요.
 */

import React, {Component} from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';
import marked from 'marked';

// prism 관련 코드 불러오기
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
// 지원할 코드 형식들을 불러옵니다.
// http://prismjs.com/#languages-list 참조
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

const cx = classNames.bind(styles);

class MarkdownRender extends Component {
    state ={
        html: ''
    }

    renderMarkdown = () => {
        const {markdown} = this.props;

        // 마크다운이 존재하지 않는다면 공백처리
        if(!markdown){
            this.setState({html: ''});
            return;
        }
        this.setState({
            html: marked(markdown, {
                breaks:true,    // 일반 엔터로 새 줄 입력
                sanitize:true   // 마크다운 내부 html 무시
            })
        });
    }

    constructor(props){
        super(props);
        const {markdown} = props;
        // 서버사이드 렌더링에도 마크다운 처리가 되도록 constructor 쪽에서도 구현
        this.state = {
            html: markdown ? marked(props.markdown, {breaks:true, sanitize: true}) : ''
        }
    }

    componentDidMount(){
        Prism.highlightAll();
    }

    componentDidUpdate(prevProps, prevState){
        // markdown 값이 변경되면, renderMarkdown 을 호출합니다.
        if(prevProps.markdown !== this.props.markdown) {
            this.renderMarkdown();
        }
        // state가 바뀌면 코드 하일라이팅
        if(prevState.html !== this.state.html){
            Prism.highlightAll();
        }
    }

    render(){
        const {html} = this.state;

        // React에서 html을 렌더링 하려면 객체를 만들어서 내부에 __html값을 설정해야 합니다.
        const markup = {
            __html: html
        };

        //그리고, dangerouslySetInnerHTML 값에 해당 객체를 넣어주면 됩니다.
        return(
            <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup}/>
        );
    }
}

/*
컴포넌트가 생성될 때 호출되는 constructor 와 componentDidUpdate 에서 마크다운 변환 작업을 처리해주었습니다. 
constructor 에서 마크다운 변환 작업을 해주는 이유는 
constructor 함수는 서버사이드 렌더링을 하게 될 때도 호출되기 때문입니다. 반면, 
이 작업을 만약에 componentDidMount 에서 하게된다면, 브라우저 쪽에서만 실행 되고, 
나중에 서버쪽에서는 호출되지 않게 되겠죠.
*/


export default MarkdownRender;
