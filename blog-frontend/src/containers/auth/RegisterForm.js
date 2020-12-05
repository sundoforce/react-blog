import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: authError,
        user: user.user
    }));
    // 인풋 변경 인벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        )
    };

    // 폼 등록 이벤트 헨들러
    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        if (password !== passwordConfirm) {
            // TODO 
            return ;
        }
        dispatch(register({ username, password }));
    }

    // 컴포넌트가 처음 렌더링 될 때 form을 초기화 함
    useEffect(()=> {
        dispatch(initializeForm('register'));

    }, [dispatch]);

    // 휘원가입 성공/실채 처리
    useEffect(() => {
        if (authError) {
            console.log("오류발생");
            console.log(authError);
            return;
        }
        if (auth) {
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]); 


    // user 값이 잘 설정 되었는지 확인
    useEffect(()=>{
        if (user) {
            history.push('/'); // 혹화면으로 이동
        }
    }, [history, user])

    return (
        <AuthForm
        type="register"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        />
    );
};

export default RegisterForm;