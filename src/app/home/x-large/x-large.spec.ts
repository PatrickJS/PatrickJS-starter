import {
  async,
  inject
} from '@angular/core/testing';
import { Component } from '@angular/core';

// Load the implementations that should be tested
import { XLarge } from './x-large.directive';
import { TestComponentBuilder } from '@angular/core/testing/test_component_builder';

describe('x-large directive', () => {
  // Create a test component to test directives
  @Component({
    template: '',
    directives: [ XLarge ]
  })
  class TestComponent {}

  it('should sent font-size to x-large', async(inject([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<div x-large>Content</div>')
      .createAsync(TestComponent).then((fixture: any) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement.children[0];
        expect(compiled.style.fontSize).toBe('x-large');
      });
  })));

});
