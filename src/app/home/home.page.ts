import { SendPage } from './../models/SendPage.interface';
import { Observable, Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest/rest.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Comic } from '../models/Comic.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public comics: Comic[] | undefined = undefined;
  public page = 0;
  public pages: number = undefined;
  public url = 'http://localhost:8080/api/v1/';
  public error: string | undefined = undefined;
  private subscription: Subscription;

  constructor(private rest: RestService) {
    this.subscription = this.rest.getLatestComics(this.page).subscribe({
      next: this.addData,
      error: this.setError,
    });
  }

  ngOnInit() {}

  public nextPage() {
    this.page++;
    if (this.page <= this.pages) {
      this.error = undefined;
      this.subscription.unsubscribe();
      this.subscription = this.rest.getLatestComics(this.page).subscribe({
        next: this.addData,
        error: this.setError,
      });
    } else {
      this.page = this.pages;
    }
  }

  public prevPage() {
    this.page--;
    if (this.page > 0) {
      this.error = undefined;
      this.subscription.unsubscribe();
      this.subscription = this.rest.getLatestComics(this.page).subscribe({
        next: this.addData,
        error: this.setError,
      });
    } else {
      this.page = 1;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    delete this.error;
    delete this.page;
    delete this.pages;
    delete this.subscription;
    delete this.comics;
    delete this.rest;
  }

  private setError(error: any) {
    this.error = error.error;
  }

  private addData(page: SendPage) {
    if (page) {
      this.comics = page.content as Comic[];
    }
  }
}
