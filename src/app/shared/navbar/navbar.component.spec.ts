import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NavbarComponent, Pages } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerEventsSubject$: Subject<any>;
  let routerStub: Partial<Router>;

  beforeEach(() => {
    routerEventsSubject$ = new Subject<any>();
    routerStub = {
      events: routerEventsSubject$.asObservable(),
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatToolbarModule],
      providers: [{ provide: Router, useValue: routerStub }],
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set activeRoute to GALLERY on photos navigation', () => {
    routerEventsSubject$.next(new NavigationEnd(1, '/', '/'));
    expect(component.activeRoute).toEqual(Pages.GALLERY);
  });

  it('should set activeRoute to FAVORITES on favorites navigation', () => {
    routerEventsSubject$.next(new NavigationEnd(1, '/favorites', '/favorites'));
    expect(component.activeRoute).toEqual(Pages.FAVORITES);
  });

  it('should set activeRoute to DETAIL_VIEW on photos navigation', () => {
    routerEventsSubject$.next(new NavigationEnd(1, '/photos/1', '/photos/1'));
    expect(component.activeRoute).toEqual(Pages.DETAIL_VIEW);
  });
});
