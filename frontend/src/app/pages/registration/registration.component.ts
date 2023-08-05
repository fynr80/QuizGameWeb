import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  inputPassword: string = '';
  repeatPassword: string = '';
  inputUsername: string = '';
  inputEmail: string = '';
  showErrorMessage: boolean = false;
  errorMessage!: string;

  constructor(public authService: AuthService, private router: Router) {}

  // TODO: email validation
  // TODO: implement email already used in backend
  async submit() {
    if (
      this.inputEmail == undefined ||
      this.inputPassword == undefined ||
      this.inputUsername == undefined ||
      this.repeatPassword == undefined ||
      this.inputUsername == '' ||
      this.repeatPassword == '' ||
      this.inputEmail == '' ||
      this.inputPassword == ''
    ) {
      this.errorMessage = 'Bitte füllen Sie alle Felder aus';

      this.showErrorMessage = true;
    } else {
      if (this.inputPassword != this.repeatPassword) {
        this.errorMessage = 'Passwörter stimmen nicht überein';
        this.showErrorMessage = true;
      } else {
        this.showErrorMessage = false;

        var user = await this.authService
          .register(this.inputUsername, this.inputPassword!, this.inputEmail!)
          .catch((err) => {
            this.errorMessage = 'username oder email bereits vergeben';
            this.showErrorMessage = true;
            console.log('Error', err);
          });
        // TODO: register successfully toast message or something like that -> redirect to login
        this.router.navigate(['/login']);
      }
    }
  }
}
