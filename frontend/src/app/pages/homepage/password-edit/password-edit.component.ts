import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css'],
})
export class PasswordEditComponent {
  password: string | undefined;
  userModel: UserModel | undefined;

  constructor(public http: HttpClient, private authService: AuthService) {
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });
  }

  async submit() {
    console.log('submit password');
    console.log(this.password);
    var a = await lastValueFrom(
      this.http.post<any>('http://localhost:3000/api/users/updatePassword', {
        password: this.password,
        userName: this.userModel?.username,
      })
    );
    console.log('User password updated');
    this.authService.signOut('', '');
    window.location.reload();

    return a;
  }
}
