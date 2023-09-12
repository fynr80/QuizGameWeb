import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { UserModel } from 'app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { FriendService } from 'app/services/friend-service';
import { lastValueFrom } from 'rxjs';
import { QuizRequestModalComponent } from './quiz-request-modal/quiz-request-modal.component';
interface User {
  socketId: string;
  userId: number;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  toggleQuizGame: boolean = true;
  toggleProfil: boolean = false;
  toggleStatistik: boolean = false;
  toggleVerlauf: boolean = false;
  toggleFriendRequest: boolean = false;
  toggleQuizGameStart: boolean = false;

  //users: string[] = [];
  onlineUsers: [User?] = [];

  userModel: UserModel | undefined;

  allUsers: [UserModel?] = [];

  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private modalService: NgbModal,
    private friendService: FriendService
  ) {
    this.getAllUsers();

    this.getOnlineUsers();
    this.getGameRequest();
    this.getAcceptGameRequest();
    this.friendService.sendLoginMessage(-1);

    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });
  }

  isUserInOnlineUsers(userIdToCheck: number): boolean {
    const userIndex = this.onlineUsers.findIndex(
      (user) => user?.userId === userIdToCheck
    );
    return userIndex !== -1;
  }

  isSelf(userIdToCheck: number): boolean {
    return this.userModel?.id === userIdToCheck;
  }

  async getOnlineUsers() {
    this.friendService.getMessage().subscribe((data) => {
      this.onlineUsers = [];
      data.forEach((element) => {
        this.onlineUsers.push(element);
      });
    });
  }

  async getGameRequest() {
    this.friendService.getGameRequestMessage().subscribe((data) => {
      if (data) {
        const modalRef = this.modalService.open(QuizRequestModalComponent);

        modalRef.componentInstance.userIds = data;
      }
    });
  }

  async getAcceptGameRequest() {
    this.friendService.getAcceptGameRequest().subscribe((data) => {
      if (data) {
        this.toggleQuizGameStart = true;
        this.toggleQuizGame = false;

        //const modalRef = this.modalService.open(QuizRequestModalComponent);
      }
    });
  }

  async getAllUsers() {
    const data: any = await lastValueFrom(
      this.http.get('http://localhost:3000/api/users')
    );
    this.allUsers = data.result;

    this.allUsers.forEach((element) => {
      element!.status = 'offline';
      if (this.userModel?.id === element?.id) {
        this.allUsers.splice(this.allUsers.indexOf(element), 1);
      }
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
