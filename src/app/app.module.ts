import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// importing custom modules
import { SharedModule } from './shared/shared.module';
import { reducers, metaReducers } from './reducers/search';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SearchEffects } from './effects/search';
import { SearchComponent } from './components/search/search.component';

import { routes } from './app.routes';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(
      reducers, { metaReducers }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([SearchEffects, ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
