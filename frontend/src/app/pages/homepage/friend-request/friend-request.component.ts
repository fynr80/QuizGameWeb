import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { FriendService } from 'app/services/friend-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css'],
})
export class FriendRequestComponent {
  userModel: UserModel | undefined;
  //friendRequests: Array<UserModel> = [];
  friendRequests: Array<UserModel> = [];
  friendUserName: string = '';
  requestNames: Array<string> = [];
  constructor(
    private friendService: FriendService,
    public http: HttpClient,
    private authService: AuthService
  ) {
    this.getFriendRequest();

    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
      this.getRequests();
      this.getAcceptFriendRequest();
    });
  }

  async getRequests() {
    const apiUrl = 'http://localhost:3000/api/users';
    const url = `${apiUrl}/${this.userModel?.id}/friend-requests`;

    var a = await lastValueFrom(this.http.get<any>(url));

    a.forEach((element: any) => {
      const newUser = new UserModel(
        0,
        0,
        0,
        [],
        '',
        element.username,
        element.email,
        element.id
      );
      this.requestNames.push(newUser.username);
      this.friendRequests.push(newUser);
    });
  }

  async getFriendRequest() {
    this.friendService.getFriendRequestMessage().subscribe((data) => {
      if (data) {
        const newUser = new UserModel(
          0,
          0,
          0,
          [],
          '',
          data.userName,
          '',
          data.userId
        );
        console.log(this.friendRequests);

        if (this.requestNames.indexOf(newUser.username) === -1) {
          console.log('sad');
          this.friendRequests.push(newUser);
          this.requestNames.push(newUser.username);
        }
      }
    });
  }

  async deleteRequest(friendUserModal: UserModel) {
    console.log('pressed');
    const apiUrl = 'http://localhost:3000/api/users';
    const url = `${apiUrl}/${this.userModel?.id}/updateFriend-requests`;
    var a = await lastValueFrom(
      this.http.put<any>(url, {
        friendId: friendUserModal.id,
      })
    );
    this.friendRequests = this.friendRequests.filter(
      (obj) => obj !== friendUserModal
    );
  }

  async acceptRequest(friendUserModal: UserModel) {
    this.friendService.sendAcceptFriendRequest(
      this.userModel?.id!,
      friendUserModal.id!
    );
    this.deleteRequest(friendUserModal);
  }
  async getAcceptFriendRequest() {
    let friendId: number = 0;

    this.friendService.getAcceptFriendRequest().subscribe((data) => {
      if (data) {
        this.userModel?.id == data[0]
          ? (friendId = data[1])
          : (friendId = data[0]);
        console.log(friendId);
        const apiUrl = 'http://localhost:3000/api/users';
        const url = `${apiUrl}/${this.userModel?.id}/add-new-friend`;
        lastValueFrom(
          this.http.post<any>(url, {
            friendId: friendId,
          })
        );
      }
    });
  }
}
