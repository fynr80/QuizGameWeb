import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { questionModal } from 'app/models/question.model';
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
  userone = 'Userone';
  usertwo = 'Usertwo';
  quizzes: [QuizModel?] = [];

  constructor(public http: HttpClient, private authService: AuthService) {
    this.getData2().then((data) => {
      this.getData(data).then((data) => {
        this.quizzes = data;
        console.log(this.quizzes[0]?.username1);
      });
    });
  }
  async getData(d: UserModel) {
    const apiUrl: string =
      'http://localhost:3000/api/quiz/' + this.userModel?.username;
    return new Promise<[QuizModel?]>((resolve) => {
      lastValueFrom(this.http.get<any>(apiUrl)).then((data) => {
        resolve(data);
      });
    });
  }
  async getData2() {
    return new Promise<UserModel>((resolve) => {
      this.authService.getSession().subscribe((data) => {
        this.userModel = data;
        resolve(data);
      });
    });
  }
}
