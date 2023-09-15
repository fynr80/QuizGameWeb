import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { FriendService } from 'app/services/friend-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-statistik',
  templateUrl: './statistik.component.html',
  styleUrls: ['./statistik.component.css'],
})
export class StatistikComponent {
  userModal: UserModel | undefined;
  userWins = 0;
  userLoses = 0;
  userDraw = 0;
  userAllGames = 0;
  userId = 0;

  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private friendService: FriendService
  ) {
    this.getStatistic();
    this.authService.getSession().subscribe((data) => {
      this.userModal = data;
      this.userId = data.id;
      this.userWins = data.gamesWon;
      this.userLoses = data.gamesLost;
      this.userDraw = data.gamesDraw;
      this.userAllGames = data.gamesWon + data.gamesLost + data.gamesDraw;
    });
  }

  getStatistic() {
    this.friendService.getStatistic().subscribe(async (userId) => {
      if (userId) {
        const data: any = await lastValueFrom(
          this.http.get(`http://localhost:3000/api/users/${userId}`)
        );
        this.userModal = data;
        this.userId = data.id;
        this.userWins = data.gamesWon;
        this.userLoses = data.gamesLost;
        this.userDraw = data.gamesDraw;
        this.userAllGames = data.gamesWon + data.gamesLost + data.gamesDraw;
      }
    });
  }

  async resetStats() {
    console.log('submit password');
    var a = await lastValueFrom(
      this.http.post<any>(
        'http://localhost:3000/api/users/updateGamesStatistic',
        {
          userId: this.userId,
        }
      )
    );
    //this.friendService.sendStatistic(this.userModal?.id!);

    window.location.reload();

    return a;
  }
}
