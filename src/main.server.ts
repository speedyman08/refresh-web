import {AppComponent} from "./app/app.component";

export {AppServerModule} from './app/app.server.module';

import {enableProdMode} from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import {environment} from 'src/environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";

dayjs.extend(relativeTime)

if (environment.production) {
    enableProdMode();
}

const bootstrap = () => bootstrapApplication(AppComponent);

export default bootstrap;
