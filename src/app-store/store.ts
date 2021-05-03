import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from "./root-reducer";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware] as const
});

epicMiddleware.run(rootEpic);
export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch