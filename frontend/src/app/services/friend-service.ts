import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { questionModal } from 'app/models/question.model';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable()
export class FriendService {
  //randomQuestions: [questionModal?] = [];
  constructor(private socket: Socket, public http: HttpClient) {}

  sendLoginMessage(userId: number) {
    this.socket.emit('login', { userId: userId });
  }
  sendLogoutMessage(userId: number) {
    this.socket.emit('logout', { userId: userId });
  }
  sendGameRequestMessage(userId: number, friendId: number) {
    this.socket.emit('gameRequest', { userId: userId, friendId: friendId });
  }

  sendAcceptFriendRequest(userId: number, friendId: number) {
    this.socket.emit('acceptFriendRequest', {
      userId: userId,
      friendId: friendId,
    });
  }
  sendFriendRequestMessage(userName: string, userId: number, friendId: number) {
    this.socket.emit('friendRequest', {
      userName: userName,
      userId: userId,
      friendId: friendId,
    });
  }
  sendOnSubmitAnswer(friendId: number, enemySum: number) {
    this.socket.emit('submitAnswer', {
      friendId: friendId,
      enemySum: enemySum,
    });
  }
  getGameRequestMessage() {
    return this.socket.fromEvent<number>('gameRequest');
  }
  getAcceptFriendRequest() {
    return this.socket.fromEvent<Array<number>>('acceptFriendRequest');
  }
  getFriendRequestMessage() {
    return this.socket.fromEvent<any>('friendRequest');
  }

  getOnSubmitAnswer() {
    return this.socket.fromEvent<number>('submitAnswer');
  }

  sendAcceptGameRequest(userId: number, friendId: number) {
    this.getRandomQuestions().then((randomQuestions) => {
      this.socket.emit('acceptGameRequest', {
        userId: userId,
        friendId: friendId,
        randomQuestions: randomQuestions,
      });
    });
  }

  getAcceptGameRequest() {
    return this.socket.fromEvent<Array<any>>('acceptGameRequest');
  }

  getMessage() {
    return this.socket.fromEvent<Array<any>>('onlineUsers');
  }

  apiUrl: string = 'http://localhost:3000/api/questions';
  async getRandomQuestions() {
    return new Promise<questionModal[]>((resolve, reject) => {
      const randomQuestions: questionModal[] = [];
      this.http.get<any>(this.apiUrl).subscribe(
        (data) => {
          const shuffledQuestions = this.shuffle(data.result);
          const selectedQuestions = shuffledQuestions.slice(0, 5);
          selectedQuestions.forEach((element: any) => {
            const newQuestion = new questionModal(
              element.id,
              element.description,
              element.answers,
              element.correctAnswers
            );

            randomQuestions.push(newQuestion);
          });
          resolve(randomQuestions);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }
}
