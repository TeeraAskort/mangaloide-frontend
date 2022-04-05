import { StorageService } from './../../services/storage/storage.service';
import { RestService } from './../../services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public error: string | undefined = undefined;

  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private rest: RestService,
    private storageService: StorageService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {}

  public register(): void {
    if (this.loginForm.valid) {
      this.error = undefined;
      const password: string = this.loginForm.controls.password.value;
      const passwordRepeat: string =
        this.loginForm.controls.passwordRepeat.value;
      if (password === passwordRepeat) {
        const username = this.loginForm.controls.username.value;
        this.rest.register(username, password, passwordRepeat).subscribe({
          next: (data) => {
            const user = Buffer.from(username + ':' + password);
            if (data) {
              this.storageService.setItem('user', user.toString('base64'));
              this.router.navigate(['/home']);
            }
          },
          error: (error) => {
            this.error = error.error;
          },
        });
      } else {
        this.error = 'Passwords do not match';
      }
    } else {
      this.error = 'You need to enter your username and password';
    }
  }
}
