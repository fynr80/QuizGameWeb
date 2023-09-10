import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/pages/login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  // TODO: bug -> if you write in the url /login you get redirected to homepage ..
  /*canActivate(): boolean {
    if (this.authService.isAuthenticatedd()) {
      console.log('User is logged in');
      this.router.navigate(['/homepage']);

      return false;
    } else {
      return true;
    }
  }*/

  async canActivate(): Promise<boolean> {
    if (!(await this.authService.isAuthenticatedd())) {
      console.log('User is not logged in from Guard');
      this.router.navigate(['/login']);

      return false;
    } else {
      console.log('User is  logged in from Guard');

      return true;
    }
  }
}
