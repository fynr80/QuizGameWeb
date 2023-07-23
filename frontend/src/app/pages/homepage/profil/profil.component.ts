import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  username = 'Username';
  email = 'E-Mail';
  points = 1231;
  changeUsername() {}
  changePassword() {}
}
