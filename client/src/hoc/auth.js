import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
    /* 
    option에 들어갈 수 있는 값
        1. null : 아무나 출입이 가능한 페이지
        2. true : 로그인한 유저만 출입 가능
        3. false : 로그인한 유저는 출입 불가능    
    */
    function AuthenticationCheck(props) {
        console.log('auth', props);
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then((response) => {
                console.log(response);

                if (!response.payload.isAuth) {
                    // 로그인하지않은 상태
                    if (option) {
                        props.history.push('/login');
                    }
                } else {
                    // 로그인한 상태
                    if ((adminRoute && !response.payload.isAdmin) || !option) {
                        // admin아닌데 admin 페이지 들어갈려할때
                        props.history.push('/');
                    }
                }
            });
        }, []);
        return <SpecificComponent />;
    }
    return AuthenticationCheck;
}
