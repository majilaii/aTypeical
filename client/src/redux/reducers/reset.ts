import Action from "../actions/actionType";

const initialState = {
    reset: true,
};

const resetReducer = (state = initialState, action: Action<null>) => {
    switch (action.type) {
        case 'RESET-TOGGLE':
            return {
                ...state,
                reset: !state.reset,
            };
        default: 
            return state;
    }
};

export default resetReducer;