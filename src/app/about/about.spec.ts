import {
    async,
    inject,
    TestBed,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { AboutComponent } from './about.component';

describe('About component', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            AboutComponent,
        ],
    }));

    it('should have default data', inject([AboutComponent], (about: AboutComponent) => {
        expect(about.aboutMsg).toEqual('About');
    }));
});
