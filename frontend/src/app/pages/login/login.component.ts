import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showErrorMessage: boolean = false;
  showPassword: boolean = false;
  errorMessage!: string;
  loginbool = false;
  inputEmail: string | undefined;
  inputPassword: string | undefined;

  constructor(public authService: AuthService, private router: Router) {}

  // TODO: bug -> if you click on login button and then on register button, the login button is still clicked
  async submit() {
    if (
      this.inputEmail == undefined ||
      this.inputPassword == undefined ||
      this.inputEmail == '' ||
      this.inputPassword == ''
    ) {
      this.showErrorMessage = true;
      this.errorMessage = 'Bitte füllen Sie alle Felderr aus';
      return;
    }

    var user = await this.authService
      .login(this.inputEmail!, this.inputPassword!)
      .catch((err) => {
        console.log(err);
      });

    if (user == undefined) {
      this.errorMessage = 'Falsche E-Mail oder Passwort';
      this.showErrorMessage = true;
    } else {
      this.router.navigate(['/homepage']);
    }
  }
}
