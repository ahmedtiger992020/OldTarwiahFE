import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  ModuleRegistry.registerModules([ ClientSideRowModelModule ]);