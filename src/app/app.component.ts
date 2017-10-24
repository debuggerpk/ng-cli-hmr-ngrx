import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from './reducers/search';
import * as search from './actions/search';
import * as models from './models/results';


@Component({
  selector: 'uwt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public searchOption: Observable<number>;
  public searchOption = 1;
  public queryString = '';
  public searchResults: Observable<models.ResultInteface[]>;
  // public queryString: Observable<string>;

  constructor(private store: Store<reducers.State>) {}

  public changeSearchOption(option: number) {
    console.log(option);
  }

  public onSearch($event: string) {
    this.store.dispatch(new search.SearchCountry(this.queryString));
    this.store.select(reducers.getSearchResults).subscribe(data => console.log(data));
  }

  ngOnInit() {
    this.searchResults = this.store.select(reducers.getSearchResults);
    this.store.select(reducers.getSearchResults).subscribe(data => console.log(data));
    // this.store.select(reducers.getResults).subscribe(data => console.log(data));
  }
}
