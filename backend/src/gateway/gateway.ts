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
        console.log('Zaten var olan userin socketi degisti');
        console.log(onlineUsers);

        user.socketId = socket.id;
        console.log(onlineUsers);
      } else {
        console.log('Yeni bir user geldi');
      }

      socket.on('disconnect', function () {
        // remove saved socket from users object
        console.log(onlineUsers);

        const user: User = onlineUsers.find(
          (user) => user.socketId === socket.id,
        );
        console.log('userr ' + user + ' disconnected');
        console.log('BULUNNAN MAP');
        console.log(user);
        const indexOfMap = onlineUsers.findIndex(
          (user) => user.socketId == socket.id,
        );

        if (indexOfMap !== -1) {
          onlineUsers[indexOfMap].socketId = 'default';
          //users.splice(indexOfMap, 1);
          console.log(
            `Giris yaptiktan sonra refresh yapti ve socket id updated`,
          );
          console.log(onlineUsers);
        } else {
          console.log(`Giris yapmadan refresh yapti`);
        }

        //delete users[socket.id];
      });
    });
  }

  @SubscribeMessage('login')
  onLogin(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    //users[socket.id] = body.userId;
    if (body.userId == -1) {
      console.log('CHECK');
      this.server.emit('onlineUsers', onlineUsers);
    } else {
      const newUser: User = { socketId: socket.id, userId: body.userId };

      const map = new Map<string, number>();
      map.set(socket.id, body.userId);
      console.log('GIRIS YAPAN MAP');

      console.log(map);
      onlineUsers.push(newUser);
      console.log('TOPLAM MAP');
      console.log(onlineUsers);

      this.server.emit('onlineUsers', onlineUsers);
    }
  }

  @SubscribeMessage('logout')
  onLogout(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    console.log('Logout yapan userin idsi');
    console.log(body);
    const logoutUser: User = { socketId: socket.id, userId: body.userId };
    console.log('Logout yapan user class');
    console.log(logoutUser);

    const indexOfMap = onlineUsers.findIndex(
      (user) => user.socketId == socket.id,
    );

    if (indexOfMap !== -1) {
      onlineUsers.splice(indexOfMap, 1);
      console.log(`Logout user deleted from users array`);
    } else {
      console.log(`Logout user not found in users array`);
    }

    this.server.emit('onlineUsers', onlineUsers);
  }
}
