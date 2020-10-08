import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
    // axios
    //     .post('/api/users/register', { name: 'wonhee1', email: 'wonhee1@naver.com', password: 'wonhee1234!', role: 0 })
    //     .then((response) => console.log(response));
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('Email', email);
        const body = {
            email,
            password,
        };
        dispatch(loginUser(body)).then((response) => {
            if (response.payload.loginSuccess) {
                props.history.push('/'); // react에서 페이지 이동하는 방법
            } else {
                alert('error');
            }
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={onPasswordHandler}
                />
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default withRouter(LoginPage);
