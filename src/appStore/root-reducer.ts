import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'


import products, { productPageEpic } from "../pages/products/product-slice";


export const rootEpic = combineEpics(
  productPageEpic
);

const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  products
});

export default createRootReducer;