import { Action } from '@ngrx/store';

import { RestResponseInterface } from '../models/results';

export const SEARCH_COUNTRY = '[Search] Country';
export const SEARCH_COUNTRY_COMPLETE = '[Search] Complete';

export class SearchCountry implements Action {
  readonly type = SEARCH_COUNTRY;

  constructor(public payload: string) {}
}

export class SearchCountryComplete implements Action {
  readonly type = SEARCH_COUNTRY_COMPLETE;

  constructor(public payload: RestResponseInterface) {}
}
