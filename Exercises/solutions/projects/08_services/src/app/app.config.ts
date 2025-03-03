import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { appTitleProvider } from './app.token';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), appTitleProvider],
};
