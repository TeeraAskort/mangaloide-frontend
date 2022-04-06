import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../../models/User.interface';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private url = 'http://localhost:8080/api/v1/';
  private loginHeaders: HttpHeaders = new HttpHeaders({
    authorization: 'Basic ' + localStorage.getItem('user'),
  });

  constructor(private http: HttpClient) {}

  public register(
    username: string,
    password: string,
    passwordRepeat: string
  ): Observable<User> {
    const body = {
      name: username,
      password,
      passwordRepeat,
    };

    const registerHeaders: HttpHeaders = new HttpHeaders({
      'content-type': 'application/json; charset=UTF-8',
    });

    return this.http.post<User>(this.url + 'user/create', body, {
      headers: registerHeaders,
    });
  }

  public fetchUserData(): Observable<User> {
    return this.http.get<User>(this.url + 'user/login', {
      headers: this.loginHeaders,
    });
  }

  public changeImage(image: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);

    return this.http.post<User>(this.url + 'user/uploadImage', formData, {
      headers: this.loginHeaders,
    });
  }

  public changePassword(
    oldPass: string,
    newPass: string,
    newPassRepeat: string
  ): Observable<User> {
    const body = {
      oldPass,
      newPass,
      newPassRepeat,
    };

    return this.http.post<User>(this.url + 'user/changePassword', body, {
      headers: this.loginHeaders,
    });
  }
}
