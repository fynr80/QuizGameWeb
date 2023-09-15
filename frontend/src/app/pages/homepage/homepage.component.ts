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

    /*this.allFriends.forEach((element) => {
      console.log(element);
    });
    console.log('-------------------');
    this.allUsers.forEach((element) => {
      console.log(element);
    });

    const sonucDizi: any[] = this.allUsers.filter(
      (user1) => !this.allFriends.some((user2) => user2!.id === user1!.id)
    );
    console.log(sonucDizi);*/
  }

  async getAcceptFriendRequest() {
    let friendId: number = 0;

    this.friendService.getAcceptFriendRequest().subscribe(async (data) => {
      if (data) {
        this.userModel?.id == data[0]
          ? (friendId = data[1])
          : (friendId = data[0]);
        //console.log(friendId);
        const apiUrl = 'http://localhost:3000/api/users';
        const url = `${apiUrl}/${this.userModel?.id}/add-new-friend`;
        await lastValueFrom(
          this.http.post<any>(url, {
            friendId: friendId,
          })
        );
        this.getAllUsers();
      }
    });
  }
  /*async getAllFriends() {
    this.getData2().then(async (data) => {
      const apiUrl = 'http://localhost:3000/api/users';
      const url = `${apiUrl}/${data.id}/getFriends`;
      var data1 = await lastValueFrom(this.http.get<any>(url));
      console.log(data1);

      this.allFriends = data1;
    });
  } */
  async getData2() {
    return new Promise<UserModel>((resolve) => {
      this.authService.getSession().subscribe((data) => {
        this.userModel = data;
        resolve(data);
      });
    });
  }

  openPlayerModal(user: any, isFriend: boolean) {
    const modalRef = this.modalService.open(PlayerModalComponent);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.isFriend = isFriend;
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
    this.toggleQuizGame = false;
    this.toggleProfil = true;
    this.toggleStatistik = false;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = false;
    this.toggleQuizGameStart = false;
  }
  showStatistik() {
    this.toggleQuizGame = false;
    this.toggleProfil = false;
    this.toggleStatistik = true;
    this.toggleVerlauf = false;
    this.toggleFriendRequest = false;
    this.toggleQuizGameStart = false;
  }
  showVerlauf() {
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
