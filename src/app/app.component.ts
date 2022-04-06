import { User } from './models/User.interface';
import { RestService } from './services/rest/rest.service';
import { Component } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public user: User | undefined = undefined;
  public logged: boolean;

  constructor(
    private rest: RestService,
    private storageService: StorageService
  ) {
    this.logged = localStorage.getItem('user') !== null;
    if (this.logged) {
      this.rest.fetchUserData().subscribe((data) => {
        if (data) {
          this.user = data;
        }
      });
    }
    this.storageService.watchStorage().subscribe(() => {
      this.logged = localStorage.getItem('player') !== null;
      if (this.logged) {
        this.rest.fetchUserData().subscribe((data) => {
          if (data) {
            this.user = data;
          }
        });
      }
    });
  }
}
