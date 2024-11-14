import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { BottomScrollDirective } from '../shared/bottom-scroll.directive';
import { Image } from '../shared/models/image.model';
import { ImagesService } from '../shared/services/images.service';
import { GalleryComponent } from './gallery.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let imagesServiceStub: Partial<ImagesService>;

  const mockImages: Image[] = [
    { id: 1, url: '1' },
    { id: 2, url: '2' },
  ];

  beforeEach(() => {
    imagesServiceStub = {
      getFavorites: () => of([mockImages[0]]),
      getImages: (start: number) => of(mockImages),
      addToFavorites: jasmine.createSpy('addToFavorites'),
      removeFromFavorites: jasmine.createSpy('removeFromFavorites'),
    };

    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [GalleryComponent, BottomScrollDirective],
      providers: [
        BottomScrollDirective,
        { provide: ImagesService, useValue: imagesServiceStub },
      ],
    });
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    component.photos = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites on initialization', () => {
    component.ngOnInit();

    expect(component.favorites).toEqual([mockImages[0]]);
  });

  it('should load images and set isLoading to false', () => {
    expect(component.isLoading).toBeTrue();

    setTimeout(() => {
      expect(component.photos).toEqual(mockImages);
      expect(component.isLoading).toBeFalse();
    }, 500);
  });

  it('should add image to favorites if not already favorite', () => {
    const newImage: Image = { id: 3, url: 'http://example.com/image3.jpg' };
    component.addToFavorites(newImage);
    expect(imagesServiceStub.addToFavorites).toHaveBeenCalledWith(newImage);
  });

  it('should remove image from favorites if already favorite', () => {
    component.addToFavorites(mockImages[0]);
    expect(imagesServiceStub.removeFromFavorites).toHaveBeenCalledWith(
      mockImages[0]
    );
  });

  it('should check if an image is a favorite', () => {
    expect(component.isFavorite(mockImages[0])).toBeTrue();
    const nonFavoriteImage: Image = {
      id: 3,
      url: '3',
    };
    expect(component.isFavorite(nonFavoriteImage)).toBeFalse();
  });
});
