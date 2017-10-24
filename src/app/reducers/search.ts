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
}

export interface State {
  search: SearchState;
}

export const intialState: SearchState = {
  queryString: '',
  messages: [],
  results: [],
  loading: false
};

export function searchReducers(state = intialState, action: search.Actions): SearchState {
  switch (action.type) {
    case search.SEARCH_COUNTRY:
      state.queryString = action.payload;
      return state;
    case search.SEARCH_COUNTRY_ISO2:
      return state;
    case search.SEARCH_COUNTRY_ISO3:
      return state;
    case search.SEARCH_COUNTRY_COMPLETE:
      const newState = { ...state };
      newState.messages = action.payload.RestResponse.messages;
      newState.results = action.payload.RestResponse.result;
      return newState;
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

export const getResults = (state: SearchState) => state.results;
export const getSearchState = createFeatureSelector<SearchState>('search');
export const getSearchResults = createSelector(
  getSearchState,
  getResults
);
