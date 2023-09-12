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
  getMessage() {
    console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
    return this.socket.fromEvent<Array<any>>('onlineUsers');
  }
}
