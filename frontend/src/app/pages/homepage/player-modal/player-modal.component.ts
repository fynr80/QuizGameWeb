import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { FriendService } from 'app/services/friend-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-player-modal',

  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.css'],
})
export class PlayerModalComponent {
  @Input() user: UserModel | undefined;
  @Input() isFriend: boolean | undefined;
  @Input() isOnline: boolean | undefined;
  userModel: UserModel | undefined;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private authService: AuthService,
    private friendService: FriendService
  ) {
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  sendGameRequest() {
    console.log('sendGameRequest');
    this.friendService.sendGameRequestMessage(
      this.userModel?.id!,
      this.user!.id!
    );
    this.closeModal();
  }

  sendFriendRequest() {
    this.addFriend();
    this.friendService.sendFriendRequestMessage(
      this.userModel?.username!,
      this.userModel?.id!,
      this.user!.id!
    );
    this.closeModal();
  }

  async addFriend() {
    const apiUrl = 'http://localhost:3000/api/users';
    const url = `${apiUrl}/${this.userModel?.id}/friend-requests`;
    var a = await lastValueFrom(
      this.http.post<any>(url, {
        friendId: this.user?.id,
      })
    );

    console.log('Friend Request created');
  }

  async deleteFriend() {
    const apiUrl = 'http://localhost:3000/api/users';
    const url = `${apiUrl}/${this.userModel?.id}/delete-friend`;
    var a = await lastValueFrom(
      this.http.put<any>(url, {
        friendId: this.user?.id,
      })
    );
    this.friendService.sendAcceptFriendRequest(
      this.userModel?.id!,
      this.user?.id!
    );
    this.closeModal();
  }
}
