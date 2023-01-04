const words = () => {
    return {
        type: 'WORDS',
    }
}

const quotes = () => {
    return {
        type: 'QUOTES',
    }
}

const setTypingMode = (payload: 'WORDS' | 'QUOTES') => {
    return {
        type: 'SET-TYPING-MODE',
        payload
    }
}

const typing = { words, quotes, setTypingMode }
export default typing;