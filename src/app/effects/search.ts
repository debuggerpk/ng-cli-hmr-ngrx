import { SearchCountryIso2, SEARCH_COUNTRY_ISO3 } from './../actions/search';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/of';

import { CountrySearchService } from '../services/search';
import * as search from '../actions/search';
import { RestResponseInterface } from './../models/results';

@Injectable()
export class SearchEffects {
  constructor(
    public _searchService: CountrySearchService,
    public _action: Actions
  ) { }

  @Effect()
  search$ = this._action
    .ofType<search.SearchCountry>(search.SEARCH_COUNTRY)
    .map(action => {
      return action.payload;
    })
    .switchMap(query => {
      if (query === '') {
        return empty();
      }
      const nextSearch$ = this._action.ofType(search.SEARCH_COUNTRY).skip(1);

      return this._searchService
        .search(query)
        .takeUntil(nextSearch$)
        .map((result: RestResponseInterface) => {
          return new search.SearchCountryComplete(result);
        });
    })
    .catch(error => {
      return Observable.of(new search.SearchError('Undocumented API Error'));
    });

  @Effect()
  searchIso2$ = this._action
    .ofType<search.SearchCountryIso2>(search.SEARCH_COUNTRY_ISO2)
    .map(action => {
      console.log(action.payload);
      return action.payload;
    })
    .switchMap(query => {
      if (query === '' && query.length !== 2) {
        return empty();
      }

      if (query.length !== 2) {
        return Observable.of(new search.SearchError('For Iso2Code, the query string must be 2 letters!'));
      }

      const nextSearch$ = this._action.ofType(search.SEARCH_COUNTRY_ISO2).skip(1);

      return this._searchService
        .iso2code(query)
        .takeUntil(nextSearch$)
        .map((result: RestResponseInterface) => {
          return new search.SearchCountryComplete(result);
        });
    })
    .catch(error => {
      return Observable.of(new search.SearchError('Undocumented API Error'));
    });

  @Effect()
  searchIso3$ = this._action
    .ofType<search.SearchCountryIso3>(search.SEARCH_COUNTRY_ISO3)
    .map(action => {
      return action.payload;
    })
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      if (query.length !== 3) {
        return Observable.of(new search.SearchError('For Iso3Code, the query string must be 3 letters!'));
      }

      const nextSearch$ = this._action.ofType(search.SEARCH_COUNTRY_ISO3).skip(1);

      console.log(query);
      return this._searchService
        .iso3code(query)
        .takeUntil(nextSearch$)
        .map((result: RestResponseInterface) => {
          return new search.SearchCountryComplete(result);
        });
    })
    .catch(error => {
      return Observable.of(new search.SearchError('Undocumented API Error'));
    });
}
