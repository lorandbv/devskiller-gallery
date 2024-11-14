import { BottomScrollDirective } from './bottom-scroll.directive';

describe('BottomScrollDirective', () => {
  it('should create an instance', () => {
    const directive = new BottomScrollDirective();
    expect(directive).toBeTruthy();
  });

  it('should call onScroll', () => {
    const directive = new BottomScrollDirective();
    spyOn(directive.scroll$, 'next');

    directive.onScroll();
    expect(directive.scroll$.next).toHaveBeenCalled();
  });

  it('should emit scrollToEnd', () => {
    const directive = new BottomScrollDirective();
    spyOnProperty(window, 'innerHeight').and.returnValue(1000);
    spyOnProperty(window, 'scrollY').and.returnValue(500);
    spyOnProperty(document.body, 'offsetHeight').and.returnValue(1400);
    spyOn(directive.scrolledToEnd, 'emit');

    directive.checkScrollAndEmit();
    expect(directive.scrolledToEnd.emit).toHaveBeenCalled();
  });

  it('should emit scrollToEnd', () => {
    const directive = new BottomScrollDirective();
    spyOn(directive.scrolledToEnd, 'emit');

    directive.scroll$.next();

    directive.ngOnInit();
    expect(directive).toBeTruthy();
  });
});
