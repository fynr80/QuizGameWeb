import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  toggleQuizGame = false;
  toggleProfil = false;
  toggleStatistik = true;
  toggleVerlauf = false;

  showQuizGame() {
    this.toggleQuizGame = true;
    this.toggleProfil = false;
    this.toggleStatistik = false;
    this.toggleVerlauf = false;
  }
  showProfil() {
    this.toggleQuizGame = false;
    this.toggleProfil = true;
    this.toggleStatistik = false;
    this.toggleVerlauf = false;
  }
  showStatistik() {
    this.toggleQuizGame = false;
    this.toggleProfil = false;
    this.toggleStatistik = true;
    this.toggleVerlauf = false;
  }
  showVerlauf() {
    this.toggleQuizGame = false;
    this.toggleProfil = false;
    this.toggleStatistik = false;
    this.toggleVerlauf = true;
  }
}
