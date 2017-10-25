import { Action } from '@ngrx/store';

import { RestResponseInterface } from '../models/results';

export const SEARCH_COUNTRY = '[Search] Country';
export const SEARCH_COUNTRY_ISO2 = '[Search] Country by ISO 2 Code';
export const SEARCH_COUNTRY_ISO3 = '[Search] Country by ISO 3 Code';
export const SEARCH_COUNTRY_ERROR = '[Search] API Error';
export const SEARCH_COUNTRY_COMPLETE = '[Search] Complete';

export class SearchCountry implements Action {
  readonly type = SEARCH_COUNTRY;

  constructor(public payload: string) {}
}

export class SearchCountryIso2 implements Action {
  readonly type = SEARCH_COUNTRY_ISO2;

  constructor(public payload: string) {}
}

export class SearchCountryIso3 implements Action {
  readonly type = SEARCH_COUNTRY_ISO3;

  constructor(public payload: string) {}
}

export class SearchError implements Action {
  readonly type = SEARCH_COUNTRY_ERROR;

  constructor(public payload: string) {}
}

export class SearchCountryComplete implements Action {
  readonly type = SEARCH_COUNTRY_COMPLETE;

  constructor(public payload: RestResponseInterface) {}
}

export type Actions = SearchCountry | SearchCountryIso2 | SearchCountryIso3 | SearchError | SearchCountryComplete;
