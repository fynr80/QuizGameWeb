import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { UserModel } from 'app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { FriendService } from 'app/services/friend-service';
import { lastValueFrom } from 'rxjs';
import { QuizRequestModalComponent } from './quiz-request-modal/quiz-request-modal.component';
import { questionModal } from 'app/models/question.model';
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
  checkIngame: boolean = false;
  toggleQuizGame: boolean = true;
  toggleProfil: boolean = false;
  toggleStatistik: boolean = false;
  toggleVerlauf: boolean = false;
  toggleFriendRequest: boolean = false;
  toggleQuizGameStart: boolean = false;
  toogleGameStart: boolean = false;
  randomQuestions: [questionModal?] = [];
  friendId: number = 0;
  userId: number = 0;
  onlineUsers: [User?] = [];

  userModel: UserModel | undefined;

  allUsers: [UserModel?] = [];
  allFriends: [UserModel?] = [];
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
    this.getAcceptFriendRequest();
    //this.getAllFriends();
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
        this, (this.checkIngame = true);
        this.toggleQuizGameStart = true;
        this.toggleQuizGame = false;
        this.toggleProfil = false;
        this.toggleStatistik = false;
        this.toggleVerlauf = false;
        this.toggleFriendRequest = false;
        this.randomQuestions = data[2];
        this.friendId = data[1];
        this.userId = data[0];

        if (this.userModel?.id == this.userId) {
          this.toogleGameStart = true;
        }
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

    const user: any = await lastValueFrom(this.authService.getSession());

    const allFriends: any = await lastValueFrom(
      this.http.get(`http://localhost:3000/api/users/${user.id}/getFriends`)
    );

    this.allFriends = allFriends;

    const allExceptFriends: any = this.allUsers.filter(
      (user1) => !this.allFriends.some((user2) => user2!.id === user1!.id)
    );

    this.allUsers = allExceptFriends;
  }

  async getAcceptFriendRequest() {
    this.friendService.getAcceptFriendRequest().subscribe(async (data) => {
      if (data) {
        this.getAllUsers();
      }
    });
  }
  openPlayerModal(user: any, isFriend: boolean, isOnline: boolean) {
    const modalRef = this.modalService.open(PlayerModalComponent);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.isFriend = isFriend;
    modalRef.componentInstance.isOnline = isOnline;
  }

  showQuizGame() {
    if (this.checkIngame) {
      this.toggleQuizGame = false;
      this.toggleQuizGameStart = true;
    } else {
      this.toggleQuizGame = true;
      this.toggleQuizGameStart = false;
    }
    this.toggleProfil = false;
    this.toggleStatistik = false;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = false;
  }
  showProfil() {
    this.friendService.sendStatistic(this.userModel?.id!);
    this.toggleQuizGame = false;
    this.toggleProfil = true;
    this.toggleStatistik = false;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = false;
    this.toggleQuizGameStart = false;
  }
  showStatistik() {
    this.friendService.sendStatistic(this.userModel?.id!);
    this.toggleQuizGame = false;
    this.toggleProfil = false;
    this.toggleStatistik = true;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = false;
    this.toggleQuizGameStart = false;
  }
  showVerlauf() {
    this.friendService.sendGameHistory(this.userModel?.id!);
    this.toggleQuizGame = false;
    this.toggleProfil = false;
    this.toggleStatistik = false;
    this.toggleFriendRequest = false;
    this.toggleQuizGameStart = false;
    this.toggleVerlauf = true;
  }
  showFriendRequest() {
    this.toggleQuizGame = false;
    this.toggleProfil = false;
    this.toggleStatistik = false;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = true;
    this.toggleQuizGameStart = false;
  }
}
