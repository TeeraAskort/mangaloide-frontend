import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComicPage } from './comic.page';

const routes: Routes = [
  {
    path: '',
    component: ComicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicPageRoutingModule {}
