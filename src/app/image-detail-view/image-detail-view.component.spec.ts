import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Image } from '../shared/models/image.model';
import { ImagesService } from '../shared/services/images.service';
import { ImageDetailViewComponent } from './image-detail-view.component';

describe('ImageDetailViewComponent', () => {
  let component: ImageDetailViewComponent;
  let fixture: ComponentFixture<ImageDetailViewComponent>;
  let imagesServiceStub: Partial<ImagesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  const mockImage: Image = { id: 1, url: '1' };

  beforeEach(() => {
    imagesServiceStub = {
      getFavorites: () => of([mockImage]),
      removeFromFavorites: jasmine.createSpy('removeFromFavorites'),
    };
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteStub = { params: of({ id: '1' }) };

    TestBed.configureTestingModule({
      declarations: [ImageDetailViewComponent],
      imports: [MatIconModule],
      providers: [
        { provide: ImagesService, useValue: imagesServiceStub },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    });

    fixture = TestBed.createComponent(ImageDetailViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set photo if image is found in favorites', () => {
    component.ngOnInit();
    expect(component.photo).toEqual(mockImage);
  });

  it('should navigate to favorites if image is not found in favorites', () => {
    imagesServiceStub.getFavorites = () => of([]);
    component.ngOnInit();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/favorites');
  });

  it('should remove image from favorites and navigate to favorites', () => {
    component.removeFromFavorites(mockImage);
    expect(imagesServiceStub.removeFromFavorites).toHaveBeenCalledWith(
      mockImage
    );
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/favorites');
  });
});
