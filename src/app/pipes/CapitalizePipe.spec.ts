/// <reference path="../../typings/_custom.d.ts" />
import {CapitalizePipe, CapitalizeFactory} from './CapitalizePipe';

describe('Capitalize', () => {

  describe('CapitalizePipe', () => {
    var subject;
    var result;
    var pipe;

    beforeEach(() => {
      pipe = new CapitalizePipe();
    });

    afterEach(() => {
      expect(subject).toEqual(result);
    });


    it('should support string', () => {
      subject = pipe.supports('yolo');
      result = true;
    });

    it('should transform string to Capitalized versions', () => {
      subject = pipe.transform('yolo');
      result  = 'Yolo';
    });

    it('should transform all strings to Capitalized versions', () => {
      var str = 'what does the scouter say about its power level';

      subject = pipe.transform(str, true);
      result = 'What Does The Scouter Say About Its Power Level';
    });

  });

  describe('CapitalizePipe', () => {
    var subject;
    var result;
    var factory;

    beforeEach(() => {
      factory = new CapitalizeFactory();
    });

    afterEach(() => {
      expect(subject).toEqual(result);
    });

    it('should exist', () => {
      subject = Boolean(factory);
      result = true;
    });

  });


});
