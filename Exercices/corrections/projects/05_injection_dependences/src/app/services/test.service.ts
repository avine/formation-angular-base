import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  getTest(): string {
    return '123sdffs';
  }
}
