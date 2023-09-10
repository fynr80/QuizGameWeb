import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, lastValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  constructor(public http: HttpClient) {}

  async login(username: string, password: string): Promise<void> {
    var a = await lastValueFrom(
      this.http.post<any>('http://localhost:3000/api/auth/login', {
        username: username,
        password: password,
      })
    );
    /*
    if (a) {
      this.isAuthenticated = true;
    }*/
    return a;
  }

  async signOut(username: string, password: string): Promise<void> {
    console.log('User logged out');

    var a = await lastValueFrom(
      this.http.post<any>('http://localhost:3000/api/auth/logout', {})
    );
    console.log('User logged out');
    console.log(a);
    return a;
  }

  public async isAuthenticatedd(): Promise<Boolean> {
    console.log('Istek yollaniyor');

    try {
      var a = await lastValueFrom(
        this.http.get<any>('http://localhost:3000/api/auth/getSession')
      );

      console.log('Istek yollandi');

      console.log(a);

      let userData = localStorage.getItem('userInfo');
      if (a) {
        console.log('User is logged in from Service');
        return true;
      }
      console.log('User is not logged in from Service');
      return false;
    } catch (error) {
      console.error('Error: söyle bir sey', error); // Hata mesajını konsola yazdır
      return false;
    }
  }

  async register(
    username: string,
    password: string,
    email: string
  ): Promise<void> {
    var a = await lastValueFrom(
      this.http.post<any>('http://localhost:3000/api/auth/register', {
        username: username,
        password: password,
        email: email,
      })
    );
    console.log('User created');

    return a;
  }

  getSession() {
    return this.http.get<any>('http://localhost:3000/api/auth/getSession');
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
