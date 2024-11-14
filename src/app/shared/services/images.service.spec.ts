import { TestBed } from '@angular/core/testing';

import { Image } from '../models/image.model';
import { SharedModule } from '../shared.module';
import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;
  const mockImages: Image[] = [
    { id: 1, url: '1' },
    { id: 2, url: '2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [],
    });
    service = TestBed.inject(ImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get 9 images', () => {
    service.getImages(0).subscribe((images) => {
      expect(images.length).toBe(9);
    });
  });

  it('should load favorite images', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(
      JSON.stringify([mockImages[0]])
    );
    service.loadFavoriteImages();

    service.getFavorites().subscribe((favorites) => {
      expect(favorites).toEqual([mockImages[0]]);
    });
  });

  it('should load empty array if no favorite image', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(null);
    service.loadFavoriteImages();

    service.getFavorites().subscribe((favorites) => {
      expect(favorites).toEqual([]);
    });
  });

  it('should add image to favorites', () => {
    spyOn(service, 'updateLocalStorageFavorites');
    service.addToFavorites(mockImages[0]);

    service.getFavorites().subscribe((favorites) => {
      expect(favorites).toEqual([mockImages[0]]);
    });
    expect(service.updateLocalStorageFavorites).toHaveBeenCalled();
  });

  it('should remove image from favorites', () => {
    spyOn(service, 'updateLocalStorageFavorites');
    service.addToFavorites(mockImages[0]);
    service.removeFromFavorites(mockImages[0]);

    service.getFavorites().subscribe((favorites) => {
      expect(favorites).toEqual([]);
    });
    expect(service.updateLocalStorageFavorites).toHaveBeenCalled();
  });

  it('should update localStorage favorites', () => {
    spyOn(window.localStorage, 'setItem');

    service.updateLocalStorageFavorites();

    expect(window.localStorage.setItem).toHaveBeenCalledWith('favorites', '[]');
  });
});
