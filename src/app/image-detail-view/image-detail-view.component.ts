import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Image } from '../shared/models/image.model';
import { ImagesService } from '../shared/services/images.service';

@Component({
  selector: 'app-image-detail-view',
  templateUrl: './image-detail-view.component.html',
  styleUrls: ['./image-detail-view.component.scss'],
})
export class ImageDetailViewComponent {
  photo: Image = <Image>{};

  onDestroy$: Subject<void> = new Subject();

  constructor(
    private imagesService: ImagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params,
      this.imagesService.getFavorites(),
    ])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        const id = Number(res[0]?.['id']);
        const image = res[1].find((image: Image) => image?.id === id);

        if (image) {
          this.photo = image;
        } else {
          this.router.navigateByUrl('/favorites');
        }
      });
  }

  removeFromFavorites(photo: Image): void {
    this.imagesService.removeFromFavorites(photo);
    this.router.navigateByUrl('/favorites');
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
