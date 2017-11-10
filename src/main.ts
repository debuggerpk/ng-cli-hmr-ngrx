import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrModule, bootloader } from '@angularclass/hmr';

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.production) {
  enableProdMode();
}

// const main = () => (environment.hmr) ? hmrBootstrap(module, bootstrap) : bootstrap();

const main = () => (environment.hmr) ?
  bootstrap().then((ngModuleRef: any) => hmrModule(ngModuleRef, module)) :
  bootstrap();

bootloader(main);
