import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('btnSecondClick') btnSecondClick: ElementRef | undefined;
  loginbool = true;
  inputEmail: string | undefined;
  inputPassword: string | undefined;

  submit() {
    //let btn: HTMLElement = this.btnSecondClick?.nativeElement as HTMLElement;
    console.log('Submit Log-In');
    console.log(this.inputEmail);
    console.log(this.inputPassword);

    // if login correct
    if (true) {
      this.loginbool = true;
      //btn.click();
      //console.log('click');
    }
  }
}
