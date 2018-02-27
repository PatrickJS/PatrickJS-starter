import { browser, by, element } from 'protractor';
import 'tslib';

describe('Home', () => {

  beforeEach(async () => {
    /**
     * Change hash depending on router LocationStrategy.
     */
    await browser.get('/');
    await element(by.linkText('Home')).click();
  });

  it('should have a title', async () => {
    const subject = await browser.getTitle();
    const result  = 'Angular Starter by @gdi2290 from @TipeIO';
    expect(subject).toEqual(result);
  });

  it('should have `your content here` x-large', async () => {
    const subject = await element(by.css('[x-large]')).getText();
    const result  = 'Your Content Here';
    expect(subject).toEqual(result);
  });

});
