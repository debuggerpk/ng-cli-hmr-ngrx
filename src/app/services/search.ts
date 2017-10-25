import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

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

import { RestResponseInterface } from '../models/results';

@Injectable()
export class CountrySearchService {
  private baseURL = 'http://services.groupkt.com/country/';

  constructor(
    private _http: Http
  ) { }

  /**
   * Generic Search Service, We look it up genericly
   *
   * @param {string} queryString
   * @returns {Observable<ResponseInterface>}
   *
   * @memberOf CountrySearchService
   */
  public search(queryString: string): Observable<RestResponseInterface> {
    const url = this.baseURL + 'search';

    // formulating the query string
    const params = new URLSearchParams();
    params.append('text', queryString);

    return this._http.get(url, {
      search: params
    }).map(res => res.json());
  }

  public iso2code(queryString: string): Observable<RestResponseInterface> {
    const url = this.baseURL + 'get/iso2code/' + queryString;
    console.log(url);

    return this._http.get(url)
      .map(res => res.json());
  }

  public iso3code(queryString: string): Observable<RestResponseInterface> {
    const url = this.baseURL + 'get/iso3code/' + queryString;

    return this._http.get(url)
      .map(res => res.json());
  }
}
