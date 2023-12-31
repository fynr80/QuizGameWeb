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
    var a = await lastValueFrom(
      this.http.post<any>('http://localhost:3000/api/auth/logout', {})
    );

    return a;
  }

  public async isAuthenticatedd(): Promise<any> {
    try {
      var a = await lastValueFrom(
        this.http.get<any>('http://localhost:3000/api/auth/getSession')
      );
      console.log('isAuthenticatedd');
      console.log(a);
      console.log(a.username);

      return a;
    } catch (error) {
      return a;
    }
  }

  async register(username: string, password: string): Promise<void> {
    var a = await lastValueFrom(
      this.http.post<any>('http://localhost:3000/api/auth/register', {
        username: username,
        password: password,
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
