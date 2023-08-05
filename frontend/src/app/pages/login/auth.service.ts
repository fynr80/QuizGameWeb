import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

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

  public isAuthenticatedd(): Boolean {
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      console.log('User is logged in');
      return true;
    }
    console.log('User is not logged in');
    return false;
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
