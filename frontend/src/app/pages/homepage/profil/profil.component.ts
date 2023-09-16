import { Component, Input } from '@angular/core';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { FriendService } from 'app/services/friend-service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  @Input() userModel: UserModel | undefined;

  constructor(
    public authService: AuthService,
    public friendService: FriendService
  ) {}
  signOut() {
    this.friendService.sendLogoutMessage(this.userModel!.id!);
    this.authService.signOut('', '');

    //localStorage.removeItem('userInfo');
    window.location.reload();
  }
}
