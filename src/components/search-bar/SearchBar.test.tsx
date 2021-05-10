import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchBar, { ISearchResults } from './SearchBar'

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
  
  const { rerender, getByText } = render(<SearchBar searchResults={[]} searchCbk={searchBarCallback} />)
  
  function searchBarCallback(val: Observable<string>) {
    val.subscribe(v => {
      ajax.getJSON<ISearchResults[]>("/search").subscribe(apiSearchResults => {
        rerender(<SearchBar searchResults={apiSearchResults} searchCbk={searchBarCallback} />);
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