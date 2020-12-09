import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/posts/PostViewer';

const PostViewerContainer = ({ match }) => {
    // 처음으로 마운트될 때 포스트 읽기 API 요청
    const { postId } = match.params;
    const dispatch = userDispatch();
    const { post, error, loading } = useSelector(({ post, loading}) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
    }));

    useEffect(() => {
        dispatch(readPost(postId));
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    return <PostViewer post={post} loading={loading} error={error} />;

};

export default withRouter(PostViewerContainer);