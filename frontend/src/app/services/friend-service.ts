import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable()
export class FriendService {
  constructor(private socket: Socket) {}

  sendLoginMessage(userId: number) {
    this.socket.emit('login', { userId: userId });
  }
  sendLogoutMessage(userId: number) {
    this.socket.emit('logout', { userId: userId });
  }
  sendGameRequestMessage(userId: number, friendId: number) {
    this.socket.emit('gameRequest', { userId: userId, friendId: friendId });
  }

  getGameRequestMessage() {
    return this.socket.fromEvent<number>('gameRequest');
  }

  sendAcceptGameRequest(userId: number, friendId: number) {
    this.socket.emit('acceptGameRequest', {
      userId: userId,
      friendId: friendId,
    });
  }

  getAcceptGameRequest() {
    return this.socket.fromEvent<number>('acceptGameRequest');
  }

  getMessage() {
    return this.socket.fromEvent<Array<any>>('onlineUsers');
  }
}
