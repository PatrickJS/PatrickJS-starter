/// <reference path="../../typings/_custom.d.ts" />
import {CapitalizePipe} from './CapitalizePipe';

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

    describe('#support', () => {

      it('should support string', () => {
        subject = pipe.supports('yolo');
        result  = true;
      });

      it('should not support null', () => {
        subject = pipe.supports(null);
        result  = false;
      });

      it('should not support NaN', () => {
        subject = pipe.supports(NaN);
        result  = false;
      });

      it('should not support new Object()', () => {
        subject = pipe.supports(new Object());
        result  = false;
      });

      it('should not support function(){}', () => {
        subject = pipe.supports(function(){});
        result  = false;
      });

    });

    describe('#transform', () => {
      it('should transform string to Capitalized versions', () => {
        subject = pipe.transform('yolo');
        result  = 'Yolo';
      });

      it('should transform all strings to Capitalized versions', () => {
        var str = 'what does the scouter say about its power level';

        subject = pipe.transform(str, true);
        result  = 'What Does The Scouter Say About Its Power Level';
      });

    });


    describe('#capitalizeWord', () => {
      it('should capitalized a word', () => {
        subject = pipe.capitalizeWord('something');
        result  = 'Something';
      });

      it('should only capitalized first char', () => {
        subject = pipe.capitalizeWord('something something something');
        result  = 'Something something something';
      });

    });


  });

});
