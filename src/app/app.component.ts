import { Component } from '@angular/core';
import { ImagesService } from './shared/services/images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gallery-template';

  constructor(private imagesService: ImagesService) {
    this.imagesService.loadFavoriteImages();
  }
}
