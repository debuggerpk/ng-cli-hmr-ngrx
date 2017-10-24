import { Observable } from 'rxjs/Observable';
import { ResponseInterface } from './../../models/results';
import { CountrySearchService } from './../../services/search';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/of';

@Component({
  selector: 'uwt-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private id: string;
  public data: Observable<ResponseInterface>;

  constructor(
    private _route: ActivatedRoute,
    private _searchService: CountrySearchService
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.params.id;
    this.data = this._searchService.iso2code(this.id).map(data => data.RestResponse);
  }

}
