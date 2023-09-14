import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
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

  constructor(private authService: AuthService, public http: HttpClient) {
    this.authService.getSession().subscribe((data) => {
      this.userModal = data;
      this.userId = data.id;
      this.userWins = data.gamesWon;
      this.userLoses = data.gamesLost;
      this.userDraw = data.gamesDraw;
      this.userAllGames = data.gamesWon + data.gamesLost + data.gamesDraw;
      console.log(data);
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
    console.log('User password updated');
    this.authService.signOut('', '');
    window.location.reload();

    return a;
  }
}
