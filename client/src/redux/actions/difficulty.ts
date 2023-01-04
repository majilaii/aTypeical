const easy = () => {
    return {
        type: 'EASY',
    }
}

const medium = () => {
    return {
        type: 'MEDIUM',
    }
};

const hard = () => {
    return {
        type: 'HARD',
    }
};

const setDifficulty = (payload: 'EASY' | 'MEDIUM' | 'HARD') => {
    return {
        type: 'SET-DIFFICULTY',
        payload
    }
}

const difficultyActions = { easy, medium, hard, setDifficulty };
export default difficultyActions;