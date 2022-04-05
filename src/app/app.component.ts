import { User } from './models/User.interface';
import { RestService } from './services/rest/rest.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public user: User | undefined = undefined;

  constructor(private rest: RestService) {
    if (localStorage.getItem('user')) {
      this.rest.fetchPlayerData().subscribe((user) => {
        if (user) {
          this.user = user;
        }
      });
    }
  }
}
