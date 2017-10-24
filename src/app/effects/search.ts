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
      console.log(action.payload);
      return action.payload;
    })
    .switchMap(query => {
      if (query === '') {
        return empty();
      }
      const nextSearch$ = this._action.ofType(search.SEARCH_COUNTRY).skip(1);

      console.log(query);
      return this._searchService
        .search(query)
        .takeUntil(nextSearch$)
        .map((result: RestResponseInterface) => {
          return new search.SearchCountryComplete(result);
        });
    });
}
