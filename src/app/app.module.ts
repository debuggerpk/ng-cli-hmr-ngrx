import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Setting up hot module reload
import { removeNgStyles, createNewHosts, createInputTransfer, bootloader } from '@angularclass/hmr';

// importing custom modules
import { SharedModule } from './shared/shared.module';
import { reducers, metaReducers, State } from './reducers/search';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SearchEffects } from './effects/search';
import { SearchComponent } from './components/search/search.component';

import { routes } from './app.routes';
import { DetailComponent } from './components/detail/detail.component';

import 'rxjs/add/operator/take';


interface InternalStateType {
  [key: string]: any;
}

interface StoreType {
  state: InternalStateType;
  rootState: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

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
export class AppModule {
  constructor(
    public appRef: ApplicationRef,
    private appStore: Store<State>
  ) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) { return; }
    if (store.rootState) {
      this.appStore.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState
      });
    }
    // set input values
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }
  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    this.appStore.take(1).subscribe(s => store.rootState = s);
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
