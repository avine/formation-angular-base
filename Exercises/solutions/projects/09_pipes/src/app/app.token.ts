import { InjectionToken, ValueProvider } from '@angular/core';

export const APP_TITLE = new InjectionToken<string>('APP_TITLE');

export const appTitleProvider: ValueProvider = {
  provide: APP_TITLE,
  useValue: 'Bienvenue sur Zenika Ecommerce',
};
