import { SharedModule } from './../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../reducers/search';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the property queryString as null', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.queryString).toEqual('');
  });

  it('should have the property searchOption and value country', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.searchOption).toEqual('country');
  });

  it('should have the property observable property of error', async () => {
    const app = fixture.debugElement.componentInstance;
    app.error.subscribe((data) => {
      expect(data).toEqual(null);
    });
  });


  it('should have the property observable property of searchResults', async () => {
    const app = fixture.debugElement.componentInstance;
    app.searchResults.subscribe((data) => {
      expect(data).toEqual([]);
    });
  });

  it('should have the property observable property of loading', async () => {
    const app = fixture.debugElement.componentInstance;
    app.loading.subscribe((data) => {
      expect(data).toEqual(false);
    });
  });

  it('should have the property observable property of searchMessages', async () => {
    const app = fixture.debugElement.componentInstance;
    app.searchMessages.subscribe((data) => {
      expect(data).toEqual([]);
    });
  });

});
