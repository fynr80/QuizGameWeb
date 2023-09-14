import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  chart: any;
  userWins: number = 0;
  userLoses: number = 0;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.getData();
    this.createChart();
  }

  async getData() {
    return new Promise<void>((resolve) => {
      this.authService.getSession().subscribe((data) => {
        this.userWins = data.gamesWon;
        this.userLoses = data.gamesLost;
        resolve();
      });
    });
  }

  createChart() {
    this.chart = new Chart('chartId', {
      type: 'pie',
      data: {
        labels: ['Gewonnen', 'Verloren'],
        datasets: [
          {
            data: [this.userWins, this.userLoses],
            backgroundColor: ['green', 'red'],
          },
        ],
      },
    });
  }
}
