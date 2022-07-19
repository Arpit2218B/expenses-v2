import { LOGIN, LOGOUT } from "../CONSTANTS"

const initialState = {
    loggedIn: false
}

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedIn: true
            };
        case LOGOUT:
            return {
                ...state,
                loggedIn: false
            };
        default:
            return state;
    }
}