import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  inputPassword = '';
  inputUsername = '';
  inputEmail = '';

  submit() {
    console.log('Submit Registration');
    console.log(this.inputEmail);
    console.log(this.inputUsername);
    console.log(this.inputPassword);
  }
}
