import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/search';
import * as search from '../../actions/search';
import * as models from '../../models/results';

@Component({
  selector: 'uwt-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  // public searchOption: Observable<number>;
  public searchOption = 'country';
  public queryString = '';
  public searchResults: Observable<models.ResultInteface[]>;
  public error: Observable<string>;
  public loading: Observable<boolean>;
  public searchMessages: Observable<string[]>;
  // public queryString: Observable<string>;

  constructor(private store: Store<reducers.State>) {}

  public doSearch() {
    /**
     * This should not be here, it should be in effects
     * We should have another vairable in state to keep the state of selected option.
     */
    if (this.queryString.length) {
      switch (this.searchOption) {
        case 'country':
          this.store.dispatch(new search.SearchCountry(this.queryString));
          break;
        case 'iso2':
          this.store.dispatch(new search.SearchCountryIso2(this.queryString));
          break;
        case 'iso3':
          this.store.dispatch(new search.SearchCountryIso3(this.queryString));
          break;
        default:
          this.store.dispatch(new search.SearchCountry(this.queryString));
          break;
      }
    }
  }

  ngOnInit() {
    this.searchResults = this.store.select(reducers.getSearchResults);
    this.loading = this.store.select(reducers.getSearchLoading);
    this.error = this.store.select(reducers.getSearchError);
    this.searchMessages = this.store.select(reducers.getSearchMessages);
  }

}
