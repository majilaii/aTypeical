import { createStore, combineReducers } from 'redux'
import authenticatedReducer from './reducers/authenticated';

const reducers = combineReducers({authenticatedReducer});

export const store = createStore(reducers);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch