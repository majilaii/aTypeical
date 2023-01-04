import Action from "../actions/actionType";

const initialState: {difficulty: 'EASY' | 'MEDIUM' | 'HARD'} = {
    difficulty: 'EASY',
};

const difficultyReducer = (state = initialState, action: Action<null | 'EASY' | 'MEDIUM' | 'HARD'>) : {difficulty: 'EASY' | 'MEDIUM' | 'HARD'} => {
    switch (action.type) {
        case 'EASY':
            return {
                ...state,
                difficulty: 'EASY',
            };
        case 'MEDIUM':
            return {
                ...state,
                difficulty: 'MEDIUM',
            };
        case 'HARD':
            return {
                ...state,
                difficulty: 'HARD',
            };
        case 'SET-DIFFICULTY': 
            return {
                ...state,
                difficulty: action.payload
            }
        default: 
            return state;
    }
};

export default difficultyReducer;