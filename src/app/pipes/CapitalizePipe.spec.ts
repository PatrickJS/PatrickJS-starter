/// <reference path="../../../typings/tsd.d.ts" />
import {CapitalizePipe, CapitalizeFactory} from './CapitalizePipe';

describe('Capitalize', () => {
  var pipe;
  var factory;

  beforeEach(() => {
    pipe = new CapitalizePipe();
    factory = new CapitalizeFactory();

  });

  describe('CapitalizePipe', () => {

    it('should support string', () => {
      var str = 'yolo';
      expect(pipe.supports(str)).toBe(true);
    });

    it('should transform string to Capitalized versions', () => {
      var str = 'yolo';
      expect(pipe.transform(str)).toBe('Yolo');
    });

    it('should transform all strings to Capitalized versions', () => {
      var str = 'what does the scouter say about its power level';
      var result = 'What Does The Scouter Say About Its Power Level';
      expect(pipe.transform(str, true)).toEqual(result);
    });

  });



});
