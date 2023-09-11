import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { UserModel } from 'app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerModalComponent } from './player-modal/player-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  toggleQuizGame = true;
  toggleProfil = false;
  toggleStatistik = false;
  toggleVerlauf = false;

  toggleFriendRequest = false;

  //users: string[] = [];

  userModel: UserModel | undefined;

  allUsers: [UserModel?] = [];

  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private modalService: NgbModal
  ) {
    this.getAllUsers();
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });
  }

  getAllUsers() {
    this.http.get<any>('http://localhost:3000/api/users').subscribe((data) => {
      data.result.forEach((element: any) => {
        const newUser = new UserModel(
          0,
          [],
          '',
          element.username,
          element.email,
          element.id
        );

        this.allUsers!.push(newUser);
      });
    });
  }

  openPlayerModal(user: any) {
    const modalRef = this.modalService.open(PlayerModalComponent);
    modalRef.componentInstance.user = user;
  }

  showQuizGame() {
    this.toggleQuizGame = true;
    this.toggleProfil = false;
    this.toggleStatistik = false;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = false;
  }
  showProfil() {
    this.toggleQuizGame = false;
    this.toggleProfil = true;
    this.toggleStatistik = false;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = false;
  }
  showStatistik() {
    this.toggleQuizGame = false;
    this.toggleProfil = false;
    this.toggleStatistik = true;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = false;
  }
  showVerlauf() {
    this.toggleQuizGame = false;
    this.toggleProfil = false;
    this.toggleStatistik = false;
    this.toggleFriendRequest = false;

    this.toggleVerlauf = true;
  }
  showFriendRequest() {
    this.toggleQuizGame = false;
    this.toggleProfil = false;
    this.toggleStatistik = false;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = true;
  }
}
