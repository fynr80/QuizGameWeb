import { Component } from '@angular/core';

@Component({
  selector: 'app-statistik',
  templateUrl: './statistik.component.html',
  styleUrls: ['./statistik.component.css'],
})
export class StatistikComponent {
  userWins = 0;
  userLoses = 0;
  userAllGames = 0;

  resetStats() {}
}
