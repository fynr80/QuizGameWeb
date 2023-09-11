import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css'],
})
export class FriendRequestComponent {
  userModel: UserModel | undefined;
  friendRequests: Array<UserModel> = [];

  constructor(public http: HttpClient, private authService: AuthService) {
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
      this.getRequests();
    });
  }

  async getRequests() {
    const apiUrl = 'http://localhost:3000/api/users';
    const url = `${apiUrl}/${this.userModel?.id}/friend-requests`;

    var a = await lastValueFrom(this.http.get<any>(url));

    a.forEach((element: any) => {
      const newUser = new UserModel(
        0,
        [],
        '',
        element.username,
        element.email,
        element.id
      );

      this.friendRequests.push(newUser);
    });

    console.log(this.friendRequests);

    //this.http.get<any>(url);
    /*this.http
      .get<any>('http://localhost:3000/api/users/requests', {
        params: { userId: this.userModel!.id },
      })
      .subscribe((data) => {
        console.log(data);
      });*/
  }
}
