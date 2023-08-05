import { Component, Input } from '@angular/core';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  @Input() userModel: UserModel | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  username = 'this.userModel.username';
  email = 'this.userModel.username';
  points = 1231;
  changeUsername() {}
  changePassword() {}
  signOut() {
    this.authService.signOut('', '');
    localStorage.removeItem('userInfo');
    window.location.reload();
  }
}
