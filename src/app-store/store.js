import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from "./root-reducer";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware]
});

epicMiddleware.run(rootEpic);
export default store;
