import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BottomScrollDirective } from './bottom-scroll.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { NoDataComponent } from './no-data/no-data.component';

@NgModule({
  declarations: [NavbarComponent, BottomScrollDirective, NoDataComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  exports: [NavbarComponent, BottomScrollDirective, NoDataComponent],
})
export class SharedModule {}
