import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  chart: any;
  ngOnInit(): void {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart('chartId', {
      type: 'pie',
      data: {
        labels: ['Gewonnen', 'Verloren'],
        datasets: [
          {
            data: [5, 10],
            backgroundColor: ['green', 'red'],
          },
        ],
      },
    });
  }
}
