import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    };
    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        const body = {
            name,
            email,
            password,
        };
        dispatch(registerUser(body)).then((response) => {
            console.log(response);
            if (response.payload.success) {
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
                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler} />
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={onPasswordHandler}
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={onConfirmPasswordHandler}
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
