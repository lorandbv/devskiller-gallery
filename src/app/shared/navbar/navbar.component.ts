import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  activeRoute: Pages = Pages.GALLERY;
  Pages = Pages;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event?.urlAfterRedirects?.split('/')?.[1];
      });
  }
}

export enum Pages {
  GALLERY = '',
  DETAIL_VIEW = 'photos',
  FAVORITES = 'favorites',
}
