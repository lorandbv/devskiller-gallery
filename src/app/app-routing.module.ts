import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './gallery/favorites/favorites.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailViewComponent } from './image-detail-view/image-detail-view.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
  },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'photos/:id', component: ImageDetailViewComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
