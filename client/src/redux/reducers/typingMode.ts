import Action from "../actions/actionType";

const initialState: {typingMode: 'WORDS'|'QUOTES'} = {
    typingMode: localStorage.getItem('typingMode') ? JSON.parse(localStorage.getItem('typingMode')) : 'QUOTES',
};

const typingModeReducer = (state = initialState, action: Action<null | 'WORDS' | 'QUOTES'>): {typingMode: 'WORDS'|'QUOTES'} => {
    switch (action.type) {
        case 'WORDS':
            return {
                ...state,
                typingMode: 'WORDS',
            };
        case 'QUOTES':
            return {
                ...state,
                typingMode: 'QUOTES',
            };
        case 'SET-TYPING-MODE':
            return {
                ...state,
                typingMode: action.payload,
            }
        default: 
            return state;
    }
};

export default typingModeReducer;