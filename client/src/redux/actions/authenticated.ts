const login = () => {
    return {
        type: 'LOGIN',
    }
}

const logout = () => {
    return {
        type: 'LOGOUT',
    }
};

const authenticated = { login, logout };
export default authenticated;