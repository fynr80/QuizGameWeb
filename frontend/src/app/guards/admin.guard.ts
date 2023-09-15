import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from 'app/pages/login/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const a: any = await this.authService.isAuthenticatedd();
    if (!a) {
      this.router.navigate(['/login']);

      return false;
    } else {
      if (a.role === 'admin') {
        return true;
      } else {
        this.router.navigate(['/homepage']);
        return false;
      }
    }
  }
}
