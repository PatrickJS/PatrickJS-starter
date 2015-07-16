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

  describe('CapitalizeFactory', () => {
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
      result  = true;
    });

    describe('#support', () => {
      it('should support string', () => {
        subject = factory.supports('yolo');
        result  = true;
      });

      it('should not support null', () => {
        subject = factory.supports(null);
        result  = false;
      });

      it('should not support NaN', () => {
        subject = factory.supports(NaN);
        result  = false;
      });

      it('should not support new Object()', () => {
        subject = factory.supports(new Object());
        result  = false;
      });

      it('should not support function(){}', () => {
        subject = factory.supports(function(){});
        result  = false;
      });


    });

    describe('#create', () => {
      it('should be instance of CapitalizePipe', () => {
        subject = factory.create() instanceof CapitalizePipe;
        result  = true;
      });

    });


  });


});
