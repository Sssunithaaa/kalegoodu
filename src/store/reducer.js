import { LOGIN_SUCCESS, LOGOUT } from './actions';

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
