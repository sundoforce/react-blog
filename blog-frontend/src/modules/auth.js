import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-sage/effects';
import createRequestSaga, {
    createRequestActinoTypes,
} from '../lib/createRequestSaga'
import * as authAPI from '../lib/api/auth';


const CHANGE_FIELD = 'auth/CHANG_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';


const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER',
)

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE ] = createRequestActionTypes(
    'auth/LOGIN'
)

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, // register, login
        key, // username, password, passwordConfirm
        value, // 실제 바꾸려는 값
    })
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);//regiset, login
export const register = createAction(REGISTER, ({ username, password }) => ({
    username,
    password,
}));
export const login = createAction(LOGIN, ({ username, password}) => ({
    username,
    password,
}))

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function *authSage() {
    yield takeLatest(REGISTER, registerSage);
    yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
    register: {
        username:'',
        password: '',
        passwordConfirm:'',
    },
    login:{
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
}

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, {payload: form}) => 
            produce(state, draft => {
              draft[form][key] = value;  
            }),
        [INITIALIZE_FORM]: (state, {payload: form}) => ({
            ...state,
            [form]: initialState[form],
            authError: null, // 폼 전환시 회원인증 에러 초기화
            }),
            // 회원 가입 성공
        [REGISTER_SUCCESS] : (state, { payload: auth}) => ({
            ...state,
            authError: null,
            auth,
        }),
        // 회원가입 실패
        [REGISTER_FAILURE] : (state, {payload: error }) => ({
            ...state,
            authError: null,
            auth,
        }),
        // 로그인 실패
        [LOGIN_FAILURE]: (state, {payload: error }) => ({
            ...state,
            authError: error,
        })
    },
    initialState,
);

export default auth;