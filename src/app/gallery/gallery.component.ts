import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subject, take, takeUntil } from 'rxjs';
import { Image } from '../shared/models/image.model';
import { ImagesService } from '../shared/services/images.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  photos: Image[] = [];
  isLoading: boolean = true;
  favorites: Image[] = [];
  onDestroy$: Subject<void> = new Subject();

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.loadImages();
    this.imagesService
      .getFavorites()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((favorites) => {
        this.favorites = favorites;
      });
  }

  loadImages(): void {
    this.isLoading = true;
    this.imagesService
      .getImages(this.photos?.length)
      .pipe(take(1), delay(Math.floor(Math.random() * (300 - 200 - 1) + 200)))
      .subscribe((images) => {
        this.photos.push(...images);
        this.isLoading = false;
      });
  }

  addToFavorites(photo: Image): void {
    if (this.isFavorite(photo)) {
      this.imagesService.removeFromFavorites(photo);
    } else {
      this.imagesService.addToFavorites(photo);
    }
  }

  isFavorite(photo: Image): boolean {
    return !!this.favorites?.find((image: Image) => image?.id === photo?.id);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
