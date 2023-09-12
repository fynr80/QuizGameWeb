import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/pages/login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (!(await this.authService.isAuthenticatedd())) {
      this.router.navigate(['/login']);

      return false;
    } else {
      return true;
    }
  }
}
