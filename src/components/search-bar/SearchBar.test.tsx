import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Observable, Subject } from "rxjs";
import { ajax } from "rxjs/ajax";
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchBar, { SearchResults } from './SearchBar'

const server = setupServer(
  rest.get('/search', (req, res, ctx) => {
    return res(ctx.json([{
      title: "Tata Tea",
      meta: { id: 1, subCategory: "Beverages" }
    }, {
      title: "Bagh Bakri Tea",
      meta: { id: 1, subCategory: "Beverages" }
    }]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('if emits observables when punched input', async () => {
  
  const searchValueSubject = new Subject<string>();
  const searchValueObservable = searchValueSubject.asObservable();
  const { rerender, getByText } = render(<SearchBar searchCbk={searchBarCallback} resultClickFn={()=>{}} />)
  function searchBarCallback(val: string) {
    searchValueSubject.next(val);
    searchValueObservable.subscribe(v => {
      ajax.getJSON<SearchResults[]>("/search").subscribe(apiSearchResults => {
        rerender(<SearchBar searchResults={apiSearchResults} searchCbk={searchBarCallback} resultClickFn={()=>{}} />);
        expect(getByText(/Bagh Bakri Tea/i)).toBeInTheDocument();
      })
    })
  }

  const searchInput = screen.getByTestId("search-bar-input");
  searchInput.focus();
  // fireEvent.keyDown(document.activeElement || document.body);
  fireEvent.change(searchInput, { target: { value: "testText" } });

  const resultsContainer = screen.getByTestId('search-results-container');
  await waitFor(() => screen.getByTestId('search-results-container'));


})