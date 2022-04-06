import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicPageRoutingModule } from './comic-routing.module';

import { ComicPage } from './comic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComicPageRoutingModule
  ],
  declarations: [ComicPage]
})
export class ComicPageModule {}
