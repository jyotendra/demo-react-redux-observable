import { createSlice } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable';
import { map, filter, mergeMap, delay, tap, mapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { push } from 'connected-react-router'


export interface productState {
  items: Array<itemObject>;
  selectedProductCategories: Array<string>;
} 

interface itemObject {
  id: number;
  title: string;
}

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProductCategories: []
  } as productState,
  reducers: {
    requestProductsByFilter: (state, action) => {
      state.selectedProductCategories = action.payload.productCategories;
    },
    responseOfGetProducts: (state, action) => {
      console.log(action.payload);
      state.items = action.payload;
    }
  }
});

const getProductsEpic = (action$: any) => action$.pipe(
  filter(requestProductsByFilter.match),
  mergeMap(action => ajax.getJSON("https://fakestoreapi.com/products").pipe(
    map(res => responseOfGetProducts(res))
    )
  ));

const navigateToHomeEpic = (action$: any) => action$.pipe(
  filter(responseOfGetProducts.match),
  delay(5000),
  mapTo(push("/"))
);

export const productPageEpic = combineEpics(getProductsEpic, navigateToHomeEpic);


export const { requestProductsByFilter, responseOfGetProducts } = productSlice.actions;
export default productSlice.reducer;


