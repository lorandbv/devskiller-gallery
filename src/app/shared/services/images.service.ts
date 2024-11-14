import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly noOfImages: number = 9;
  private readonly favoritesKey: string = 'favorites';

  private favorites$: BehaviorSubject<Image[]> = new BehaviorSubject<Image[]>(
    []
  );

  getImages(start: number): Observable<Image[]> {
    const imagesArray = [];

    for (let i = start; i < start + this.noOfImages; i++) {
      imagesArray.push({ url: `https://picsum.photos/id/${i}/400/600`, id: i });
    }

    return of(imagesArray);
  }

  getFavorites(): Observable<Image[]> {
    return this.favorites$;
  }

  loadFavoriteImages(): void {
    this.favorites$.next(
      JSON.parse(localStorage.getItem(this.favoritesKey) || '[]')
    );
  }

  addToFavorites(photo: Image): void {
    this.favorites$.next([...new Set([...this.favorites$.value, photo])]);
    this.updateLocalStorageFavorites();
  }

  removeFromFavorites(photoToBeRemoved: Image): void {
    this.favorites$.next(
      this.favorites$.value.filter(
        (image: Image) => image.id !== photoToBeRemoved?.id
      )
    );
    this.updateLocalStorageFavorites();
  }

  updateLocalStorageFavorites(): void {
    localStorage.setItem(
      this.favoritesKey,
      JSON.stringify(this.favorites$.value)
    );
  }
}
