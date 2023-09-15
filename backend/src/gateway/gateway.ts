import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

interface User {
  socketId: string;
  userId: number;
}

const onlineUsers: [User?] = [];

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  constructor() {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('New client connected');
      const user: User = onlineUsers.find(
        (user) => user.socketId === 'default',
      );

      if (user) {
        user.socketId = socket.id;
      } else {
        console.log('New User');
      }

      socket.on('disconnect', function () {
        // remove saved socket from users object

        const user: User = onlineUsers.find(
          (user) => user.socketId === socket.id,
        );
        const indexOfMap = onlineUsers.findIndex(
          (user) => user.socketId == socket.id,
        );

        if (indexOfMap !== -1) {
          onlineUsers[indexOfMap].socketId = 'default';
          //users.splice(indexOfMap, 1);
          /*console.log(`Reload Exists User`);
          console.log(onlineUsers);*/
        } else {
          console.log(`Reload User not found in users array`);
          onlineUsers.splice(indexOfMap, 1);

          this.server.emit('onlineUsers', onlineUsers);

          //console.log(`Reload User`);
        }

        //delete users[socket.id];
      });
    });
  }

  @SubscribeMessage('login')
  onLogin(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    //users[socket.id] = body.userId;
    if (body.userId == -1) {
      this.server.emit('onlineUsers', onlineUsers);
    } else {
      const newUser: User = { socketId: socket.id, userId: body.userId };

      const map = new Map<string, number>();
      map.set(socket.id, body.userId);
      onlineUsers.push(newUser);

      this.server.emit('onlineUsers', onlineUsers);
    }
  }

  @SubscribeMessage('gameRequest')
  onGameRequest(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    const friendId = body.friendId;
    const userId = body.userId;

    const friendUser: User = onlineUsers.find(
      (user) => user.userId === friendId,
    );

    this.server.to(friendUser.socketId).emit('gameRequest', body.userId);
  }

  @SubscribeMessage('friendRequest')
  onFriendRequest(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    const friendId = body.friendId;
    const friendUser: User = onlineUsers.find(
      (user) => user.userId === friendId,
    );

    this.server.to(friendUser.socketId).emit('friendRequest', body);
  }

  @SubscribeMessage('submitAnswer')
  onSubmitAnswer(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    const friendId = body.friendId;
    const enemySum = body.enemySum;

    const friendUser: User = onlineUsers.find(
      (user) => user.userId === friendId,
    );

    this.server.to(friendUser.socketId).emit('submitAnswer', enemySum);
  }

  @SubscribeMessage('acceptGameRequest')
  onAcceptGameRequest(
    @MessageBody() body: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const friendId = body.friendId;
    const userId = body.userId;
    const friendUser: User = onlineUsers.find(
      (user) => user.userId === friendId,
    );
    const user: User = onlineUsers.find((user) => user.userId === userId);
    this.server
      .to([user.socketId, friendUser.socketId])
      .emit('acceptGameRequest', [
        body.friendId,
        body.userId,
        body.randomQuestions,
      ]);
  }

  @SubscribeMessage('logout')
  onLogout(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    const logoutUser: User = { socketId: socket.id, userId: body.userId };

    const indexOfMap = onlineUsers.findIndex(
      (user) => user.socketId == socket.id,
    );

    if (indexOfMap !== -1) {
      onlineUsers.splice(indexOfMap, 1);
      console.log(`Losgsout user deleted from users array`);
    } else {
      console.log(`Logout user not found in users array`);
    }

    this.server.emit('onlineUsers', onlineUsers);
  }

  @SubscribeMessage('acceptFriendRequest')
  onAcceptFriendRequest(
    @MessageBody() body: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const friendId = body.friendId;
    const userId = body.userId;
    const friendUser: User = onlineUsers.find(
      (user) => user.userId === friendId,
    );
    const user: User = onlineUsers.find((user) => user.userId === userId);
    this.server
      .to([user.socketId, friendUser.socketId])
      .emit('acceptFriendRequest', [body.friendId, body.userId]);
  }
}
