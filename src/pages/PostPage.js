import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Post from 'containers/post/Post';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';

const PostPage = ({match}) => {
    const {id} = match.params;
    return(
        <PageTemplate>
            <Post id={id}/>
            {/* <PostInfo/>
            <PostBody/> */}
        </PageTemplate>            
    );
};

export default PostPage;