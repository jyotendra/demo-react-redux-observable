import { createBrowserHistory } from 'history'
import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router'
import createRootReducer, { rootEpic } from "./root-reducer";

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: [epicMiddleware, routerMiddleware(history)] as const
});

epicMiddleware.run(rootEpic);
export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch