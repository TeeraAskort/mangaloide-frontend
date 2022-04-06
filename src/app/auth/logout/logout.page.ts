import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit() {}

  public logout() {
    this.storageService.removeItem('user');
    this.router.navigate(['home']);
  }
}
