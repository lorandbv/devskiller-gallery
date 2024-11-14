import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Image } from 'src/app/shared/models/image.model';
import { ImagesService } from '../../shared/services/images.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['../gallery.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Image[] = [];
  onDestroy$: Subject<void> = new Subject();

  constructor(private imagesService: ImagesService, private router: Router) {}

  ngOnInit(): void {
    this.imagesService
      .getFavorites()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((favorites) => {
        this.favorites = favorites;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
