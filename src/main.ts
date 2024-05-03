import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environments } from './env/environments';

console.log(environments)
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
