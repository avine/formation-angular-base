import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {Application} from '../app/application';

beforeEachProviders(() => [Application]);

describe('App: Application', () => {
    it('should have the `helloMsg` with the right value', inject([Application], (app) => {
        expect(app.helloMsg).toBe('This is my first component');
    }));
});
