import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
    READ_POST,
    READ_POST_SUCCESS,
    READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');

const UNLOAD_POST = 'post/UNLOAD_POST'; // 포스트 페이지에서 벗어날 때 데이터 비우 

export const readPost = createAction(READ_POST, id => id );
export const unloadPOst = createAction(UNLOAD_POST);

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
    yield takeLatest(READ_POST, readPostSaga);
}
const initialState = {
    post: null,
    error: null,

}
const post = handleActions(
    {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
        ...state,
        post,
    }),
    [UNLOAD_POST]: () => initialState,
    },
    initialState,
);

export default post;

