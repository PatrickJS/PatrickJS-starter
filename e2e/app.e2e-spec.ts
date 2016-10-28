import { DemoPage } from './app.po';

describe('demo App', function() {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
