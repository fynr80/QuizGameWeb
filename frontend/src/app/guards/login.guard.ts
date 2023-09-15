import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/pages/login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivate(): Promise<boolean> {
    if (await this.authService.isAuthenticatedd()) {
      console.log('LoginGuard: User is logged in, redirecting to home');
      this.router.navigate(['/homepage']);

      return false;
    } else {
      return true;
    }
  }
}
