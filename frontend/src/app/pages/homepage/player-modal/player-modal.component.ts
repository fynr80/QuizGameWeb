import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-player-modal',

  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.css'],
})
export class PlayerModalComponent {
  @Input() user: UserModel | undefined;

  userModel: UserModel | undefined;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });

    console.log('userModel from constructor from andere');
    console.log(this.userModel);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  async addFriend() {
    const apiUrl = 'http://localhost:3000/api/users';
    const url = `${apiUrl}/${this.userModel?.id}/friend-requests`;
    console.log('this.user?.id');
    console.log(this.user?.id);
    var a = await lastValueFrom(
      this.http.post<any>(url, {
        friendId: this.user?.id,
      })
    );

    console.log('Friend Request created');
  }
}
