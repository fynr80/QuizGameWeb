import { Component } from '@angular/core';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css'],
})
export class PasswordForgotComponent {
  inputEmail = '';
  inputPassword1 = '';
  inputPassword2 = '';

  submit() {
    console.log('submit forgotten password');
    console.log(this.inputEmail);
    console.log(this.inputPassword1);
    console.log(this.inputPassword2);
  }
}
