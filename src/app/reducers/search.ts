import { SearchState } from './search';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';

import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import { ResultInteface } from '../models/results';
import * as search from '../actions/search';

import { environment } from '../../environments/environment';

export interface SearchState {
  queryString: string;
  messages: string[];
  results: ResultInteface[];
  loading: boolean;
  error: string;
}

export interface State {
  search: SearchState;
}

export const intialState: SearchState = {
  queryString: '',
  messages: [],
  results: [],
  loading: false,
  error: null
};

export function searchReducers(state = intialState, action: search.Actions): SearchState {
  switch (action.type) {
    case search.SEARCH_COUNTRY:
      state = { ...state };
      state.queryString = action.payload;
      state.loading = true;
      state.error = null;
      return state;
    case search.SEARCH_COUNTRY_ISO2:
      state = { ...state };
      state.queryString = action.payload;
      state.loading = true;
      state.error = null;
      return state;
    case search.SEARCH_COUNTRY_ISO3:
      state = { ...state };
      state.queryString = action.payload;
      state.loading = true;
      state.error = null;
      return state;
    case search.SEARCH_COUNTRY_ERROR:
      state = { ...state };
      state.error = action.payload;
      state.loading = false;
      return state;
    case search.SEARCH_COUNTRY_COMPLETE:
      state = { ...state };
      state.messages = action.payload.RestResponse.messages;
      state.results = action.payload.RestResponse.result;
      state.loading = false;
      return state;
    default:
      return state;
  }
}


export const reducers: ActionReducerMap<State> = {
  search: searchReducers
};

export function logger(reducer: ActionReducer<State>): any {
  return storeLogger()(reducer);
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger]
  : [];

// getting observable from store
export const getSearchState = createFeatureSelector<SearchState>('search');

// the result observable
export const getResults = (state: SearchState) => state.results;
export const getSearchResults = createSelector(
  getSearchState,
  getResults
);

export const getMessages = (state: SearchState) => state.messages;
export const getSearchMessages = createSelector(
  getSearchState,
  getMessages
);

export const getLoading = (state: SearchState) => state.loading;
export const getSearchLoading = createSelector(
  getSearchState,
  getLoading
);

export const getError = (state: SearchState) => state.error;
export const getSearchError = createSelector(
  getSearchState,
  getError
);
