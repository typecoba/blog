/*
포스트 리스트 관련 리덕스 상태와 액션들이 연동된 컨테이너 컴포넌트인 ListContainer 를 만들어봅시다. 
이 컴포넌트 내부에는, PostList 와 Pagination 컴포넌트가 내장되어있습니다.
이 컴포넌트는 나중에 ListPage 에서로부터 tag 값과 page 값을 전달받게 됩니다. 
이에 따라 포스트 리스트를 불러오는 API 를 호출하고, 
데이터를 PostList 와 Pagination 에 넣어주고 
page 값이 변하면 리스트를 새로 불러오도록 코드를 작성해보겠습니다.
*/
import React, {Component} from 'react';
import PostList from 'components/list/PostList';
import Pagination from 'components/list/Pagination';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from 'store/modules/list';

class ListContainer extends Component{
    getPostList = () => {
        // 페이지와 태그 값을 부모로부터 받아옵니다.
        const {tag,page,ListActions} = this.props;
        ListActions.getPostList({
            page, tag
        });
    }

    componentDidMount() {
        this.getPostList();
    }

    componentDidUpdate(prevProps, prevState){
        // 페이지/태그가 바뀔 때 리스트를 다시 불러옵니다.
        if(prevProps.page !== this.props.page || prevProps.tag !== this.props.tag){
            this.getPostList();
            // 스크롤을 맨 위로 올립니다.
            document.documentElement.scrollTop = 0;
        }
    }

    render(){
        const{loading, posts, page, lastPage, tag} = this.props;
        if(loading) return null; // 로딩중엔 보여주지 않습니다.
        return(
            <div>
                <PostList posts={posts}/>
                <Pagination page={page} lastPage={lastPage} tag={tag}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        lastPage: state.list.get('lastPage'),
        posts: state.list.get('posts'),
        loading: state.pender.pending['list/GET_POST_LIST']
    }),
    (dispatch) => ({
        ListActions: bindActionCreators(listActions, dispatch)
    })
)(ListContainer);