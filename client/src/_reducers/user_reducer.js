import { LOGIN_USER, REGISTER_USER } from '../_actions/types';

export default function (prevState = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...prevState, loginSuccess: action.payload };
        case REGISTER_USER:
            return { ...prevState, success: action.payload };
        default:
            return prevState;
    }
}
