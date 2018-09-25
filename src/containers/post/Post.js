/*
리덕스 스토어에 있는 데이터를 컴포넌트로 전달해주기 위하여, 우리는 Post 라는 컨테이너 컴포넌트를 만들겠습니다. 
이 컴포넌트에서는 PostInfo 와 PostBody 컴포넌트를 불러오게 되며, 
componentDidMount 가 발생 할 때 props 로 받아온 id 를 사용하여 특정 id 를 가진 포스트를 불러옵니다.

렌더링을 하는 부분에서는, 로딩중일 때 아무것도 나타나지 않도록 null 을 반환해주었습니다. 
 */
import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import * as postActions from 'store/modules/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Post extends Component {
    initialize = async () => {
        const { PostActions, id } = this.props;
        try {
            await PostActions.getPost(id);
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount(){
        this.initialize();    
    }

    render(){
        const {loading, post} = this.props;
        if(loading) return null; // 로딩중일땐 아무것도 보여주지 않음
        const {title, body, publishedDate, tags} = post.toJS();

        return(
            <div>
                <PostInfo title={title} publishedDate={publishedDate} tags={tags}/>
                <PostBody body={body}/>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        post: state.post.get('post'),
        loading: state.pender.pending['post/GET_POST'] // 로딩상태
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(Post);

