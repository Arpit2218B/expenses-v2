import { LOGIN, LOGOUT } from "../CONSTANTS";

export const loginUser = () => ({
    type: LOGIN
});

export const logoutUser = () => ({
    type: LOGOUT
});