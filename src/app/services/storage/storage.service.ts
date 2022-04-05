import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageSubject = new Subject<string>();

  constructor() {}

  public watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }

  public setItem(key: string, data: string) {
    localStorage.setItem(key, data);
    this.storageSubject.next('changed');
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
    this.storageSubject.next('changed');
  }

  public sendSignal() {
    this.storageSubject.next('changed');
  }
}
