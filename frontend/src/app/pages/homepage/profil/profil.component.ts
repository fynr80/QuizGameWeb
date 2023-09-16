import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { FriendService } from 'app/services/friend-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  userId: number = 0;
  userWins: number = 0;
  userLoses: number = 0;
  userName: string = '';
  userDraw: number = 0;
  userAllGames: number = 0;
  constructor(
    public authService: AuthService,
    public friendService: FriendService,
    public http: HttpClient
  ) {
    this.getStatistic();
  }
  getStatistic() {
    this.friendService.getStatistic().subscribe(async (userId) => {
      if (userId) {
        const data: any = await lastValueFrom(
          this.http.get(`http://localhost:3000/api/users/${userId}`)
        );
        this.userId = data.id;
        this.userName = data.username;
        this.userWins = data.gamesWon;
        this.userLoses = data.gamesLost;
        this.userDraw = data.gamesDraw;
        this.userAllGames = data.gamesWon + data.gamesLost + data.gamesDraw;
      }
    });
  }
  signOut() {
    this.friendService.sendLogoutMessage(this.userId);
    this.authService.signOut('', '');
    window.location.reload();
  }
}
