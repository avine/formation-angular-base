import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { appTitleProvider } from './app.token';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), appTitleProvider],
};
