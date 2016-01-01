import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {Application} from '../app/application';

beforeEachProviders(() => [Application]);

describe('App: Tedt', () => {
  it('should have the `defaultMeaning` as 42', inject([Application], (app) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  it('should have the `helloMsg` with the right value', inject([Application], (app) => {
    expect(app.helloMsg).toBe('This is my first component');
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([Application], (app) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});
