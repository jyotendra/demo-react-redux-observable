import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import products, { getProductsEpic } from "../pages/products/product-slice";


export const rootEpic = combineEpics(
  getProductsEpic
);

export const rootReducer = combineReducers({
  products,
});