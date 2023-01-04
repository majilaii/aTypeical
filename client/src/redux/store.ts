import { createStore, combineReducers } from 'redux'
import authenticatedReducer from './reducers/authenticated';
import resetReducer from './reducers/reset';
import typingModeReducer from './reducers/typingMode';
import difficultyReducer from './reducers/difficulty';


const reducers = combineReducers({authenticatedReducer, resetReducer, typingModeReducer, difficultyReducer});

export const store = createStore(reducers);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch