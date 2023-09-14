import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { QuizModel } from 'app/models/quiz.model';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-verlauf',
  templateUrl: './verlauf.component.html',
  styleUrls: ['./verlauf.component.css'],
})
export class VerlaufComponent {
  userModel: UserModel | undefined;

  constructor(public http: HttpClient, private authService: AuthService) {
    this.getUserr().then((data) => {
      this.getVerlauf(data.username);
    });
  }

  quizzes: [QuizModel?] = [];

  async getVerlauf(userName?: string) {
    const apiUrl: string = 'http://localhost:3000/api/quiz/' + userName;
    await lastValueFrom(this.http.get<any>(apiUrl)).then((data) => {
      this.quizzes = data;
    });
  }

  async getUserr() {
    return new Promise<UserModel>((resolve, reject) => {
      this.authService.getSession().subscribe((data) => {
        resolve(data);
      });
    });
  }

  userone = 'Userone';
  usertwo = 'Usertwo';
}
