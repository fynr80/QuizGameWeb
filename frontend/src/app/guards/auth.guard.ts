import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/pages/login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const a: any = await this.authService.isAuthenticatedd();
    if (!a) {
      this.router.navigate(['/login']);

      return false;
    } else {
      if (a.role === 'admin') {
        this.router.navigate(['/admin']);
        return false;
      } else {
        return true;
      }
    }
  }
}
