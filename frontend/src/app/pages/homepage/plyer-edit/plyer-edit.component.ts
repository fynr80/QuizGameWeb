import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-plyer-edit',
  templateUrl: './plyer-edit.component.html',
  styleUrls: ['./plyer-edit.component.css'],
})
export class PlyerEditComponent {
  newUsername: string | undefined;
  userModel: UserModel | undefined;

  constructor(public http: HttpClient, private authService: AuthService) {
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });
  }

  async submit() {
    const apiUrl = 'http://localhost:3000/api/users';
    const url = `${apiUrl}/${this.userModel?.id}`;

    this.userModel!.username = this.newUsername!;

    var a = await lastValueFrom(
      this.http.put<any>(url, {
        newUserName: this.newUsername!,
      })
    );
    console.log('User updated');
    this.authService.signOut('', '');
    window.location.reload();

    return a;
  }
}
