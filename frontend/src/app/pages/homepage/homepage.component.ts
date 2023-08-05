import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { UserModel } from 'app/models/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  toggleQuizGame = true;
  toggleProfil = false;
  toggleStatistik = false;
  toggleVerlauf = false;

  users: string[] = [];

  userModel: UserModel | undefined;

  constructor(private authService: AuthService) {
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });
  }

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
