import { createSlice } from '@reduxjs/toolkit'
import { map, filter, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';


const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProductCategories: []
  },
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


