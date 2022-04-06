import { SendPage } from './../models/SendPage.interface';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { Comic } from '../models/Comic.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public comics: Comic[] | undefined = undefined;
  public page = 0;
  public pages: number = undefined;
  public url = 'http://localhost:8080/api/v1/';
  public error: string | undefined = undefined;

  constructor(private rest: RestService) {
    this.rest.getLatestComics(this.page).subscribe({
      next: (data) => {
        if (data) {
          this.comics = data.content as Comic[];
          this.pages = data.totalPages;
        }
      },
      error: (error) => {
        this.error = error.error;
      },
    });
  }

  ngOnInit() {}

  public nextPage() {
    this.page++;
    if (this.page <= this.pages) {
      this.rest
        .getLatestComics(this.page)
        .subscribe((data) => {
          if (data) {
            this.comics = data.content as Comic[];
          }
        })
        .unsubscribe();
    } else {
      this.page = this.pages;
    }
  }

  public prevPage() {
    this.page--;
    if (this.page > 0) {
      this.rest
        .getLatestComics(this.page)
        .subscribe((data) => {
          if (data) {
            this.comics = data.content as Comic[];
          }
        })
        .unsubscribe();
    } else {
      this.page = 1;
    }
  }
}
