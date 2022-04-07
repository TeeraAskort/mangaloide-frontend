import { Observable, Subscription } from 'rxjs';
import { RestService } from './../services/rest/rest.service';
import { Comic } from './../models/Comic.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit, OnDestroy {
  public id: number | undefined = undefined;
  public comic: Comic | undefined = undefined;
  public observable: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rest: RestService
  ) {
    const param: string | null = route.snapshot.paramMap.get('id');
    if (param) {
      this.id = parseInt(param, 10);
    } else {
      router.navigate(['/home']);
    }
    this.observable = this.rest.getComicById(this.id).subscribe((comic) => {
      if (comic) {
        this.comic = comic;
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.observable) {
      this.observable.unsubscribe();
    }

    delete this.comic;
    delete this.id;
    delete this.observable;
    delete this.rest;
    delete this.router;
    delete this.route;
  }
}
