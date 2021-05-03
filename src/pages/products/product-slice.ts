import { createSlice } from '@reduxjs/toolkit'
import { map, filter, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';


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

export const getProductsEpic = action$ => action$.pipe(
  filter(requestProductsByFilter.match),
  mergeMap(action => ajax.getJSON("https://fakestoreapi.com/products").pipe(
    map(res => responseOfGetProducts(res))
  ))
);


export const { requestProductsByFilter, responseOfGetProducts } = productSlice.actions;
export default productSlice.reducer;


