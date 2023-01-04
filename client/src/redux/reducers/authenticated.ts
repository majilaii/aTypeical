import Action from "../actions/actionType";

const initialState = {
    isAuthenticated: false,
};

const authenticatedReducer = (state = initialState, action: Action<null>) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
            };
        default: 
            return state;
    }
};

export default authenticatedReducer;