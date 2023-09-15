import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../login/auth.service';
import { UserModel } from 'app/models/user.model';
import { FriendService } from 'app/services/friend-service';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  chart: any;
  userWins: number = 0;
  userLoses: number = 0;
  userDraw: number = 0;
  constructor(
    private authService: AuthService,
    private friendService: FriendService,
    public http: HttpClient
  ) {
    //this.getStatistic();
    this.getUser();

    console.log('PieChartComponent.constructor()');
  }

  async getUser() {
    const user: any = await lastValueFrom(this.authService.getSession());

    const data: any = await lastValueFrom(
      this.http.get(`http://localhost:3000/api/users/${user.id}`)
    );

    this.userWins = data.gamesWon;
    this.userLoses = data.gamesLost;
    this.userDraw = data.gamesDraw;
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('chartId', {
      type: 'pie',
      data: {
        labels: ['Gewonnen', 'Verloren', 'Unentschieden'],
        datasets: [
          {
            data: [this.userWins, this.userLoses, this.userDraw],
            backgroundColor: ['green', 'red', 'gray'],
          },
        ],
      },
    });
  }
}
