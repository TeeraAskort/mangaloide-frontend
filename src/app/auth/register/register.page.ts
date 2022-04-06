import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest/rest.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public error: string | undefined = undefined;

  public registerForm: FormGroup;

  constructor(
    private router: Router,
    private restService: RestService,
    private storageService: StorageService
  ) {
    const checkBothPasswordsAreTheSame: ValidatorFn = (fg: AbstractControl) => {
      const password: string = fg.get('password')?.value;
      const passwordRepeat: string = fg.get('passwordRepeat')?.value;

      return password === passwordRepeat ? null : { passwordsDontMatch: true };
    };

    this.registerForm = new FormGroup(
      {
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordRepeat: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validators: checkBothPasswordsAreTheSame }
    );
  }

  ngOnInit() {}

  public register(): void {
    if (this.registerForm.valid) {
      this.error = undefined;
      const password: string = this.registerForm.controls.password.value;
      const passwordRepeat: string =
        this.registerForm.controls.passwordRepeat.value;
      if (password === passwordRepeat) {
        const username = this.registerForm.controls.username.value;
        this.restService
          .register(username, password, passwordRepeat)
          .subscribe({
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
