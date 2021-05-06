import { createSlice } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable';
import { map, filter, mergeMap, delay, tap, mapTo, catchError} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { push } from 'connected-react-router'
import { of } from 'rxjs';


interface productState {
  items: itemObject[];
  selectedProductCategories: string[];
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
    },
    errorResponse: (state, action) => {
      console.log(action.type);
    }
  }
});


const getProductsEpic = (action$: any) => action$.pipe(
  filter(requestProductsByFilter.match),
  mergeMap(action => ajax.getJSON("https://fakestoreapi.com/products").pipe(
    map(res => responseOfGetProducts(res)),
    catchError(err => of(errorResponse(err)))
  )
  ));

const navigateToHomeEpic = (action$: any) => action$.pipe(
  filter(responseOfGetProducts.match),
  delay(5000),
  mapTo(push("/home"))
);

export const productPageEpic = combineEpics(getProductsEpic, navigateToHomeEpic);


export const { requestProductsByFilter, responseOfGetProducts, errorResponse } = productSlice.actions;
export default productSlice.reducer;


