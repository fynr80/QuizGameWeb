import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { questionModal } from 'app/models/question.model';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { FriendService } from 'app/services/friend-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.css'],
})
export class QuizGameComponent {
  @Input() randomQuestions: [questionModal?] = [];
  @Input() friendId!: number;
  @Input() userId!: number;
  @Input() toogleGameStart!: boolean;
  questionNumber: number = 0;
  newid: number = 0;
  friendSubmit: boolean = false;
  userSubmit: boolean = false;
  userModel: UserModel | undefined;
  counterArr = new Array<boolean>(10);
  isWin: number = -1;
  showStatistic: boolean = false;

  sum: number = 0;
  enemySum: number = 0;

  constructor(
    private authService: AuthService,
    private friendService: FriendService,
    public http: HttpClient
  ) {
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });
    this.getOnSubmitAnswer();
  }

  buttonClicked(answer: string, num: number) {
    this.userSubmit = true;
    this.questionNumber++;
    if (this.userModel?.id == this.friendId) {
      this.newid = this.userId;
      this.toogleGameStart = !this.toogleGameStart;
    } else {
      this.newid = this.friendId;
      this.toogleGameStart = !this.toogleGameStart;
    }
    if (this.friendSubmit == true) {
      this.friendSubmit = false;
      this.userSubmit = false;
    }
    this.counterArr[num] = this.checkValue(answer, num);

    if (this.questionNumber == 5) {
      if (this.enemySum == 0) {
        this.sum = this.pointCalc();
      } else {
        this.sum = this.pointCalc();

        if (this.enemySum > this.sum) {
          this.isWin = 2;
        } else if (this.enemySum < this.sum) {
          this.isWin = 1;
        } else {
          this.isWin = 0;
        }
        this.updateUsersQuizResultNumber(this.userModel?.id!, this.isWin);

        this.showStatistic = true;
      }
    }

    this.friendService.sendOnSubmitAnswer(this.newid, this.sum);
  }

  async getOnSubmitAnswer() {
    this.friendService.getOnSubmitAnswer().subscribe((data) => {
      if (data != null) {
        this.friendSubmit = true;
        this.enemySum = data;
        if (this.questionNumber == 5) {
          this.showStatistic = true;
          this.sum = this.pointCalc();
          this.updateUsersQuizResultNumber(this.userModel?.id!, this.isWin);
          if (this.isWin == 1) {
            this.getUsersById(this.userId).then((data) => {
              this.createQuizForHistory(
                this.userModel?.username!,
                data.username,
                this.userModel?.username!
              );
            });
          } else if (this.isWin == 2) {
            this.getUsersById(this.userId).then((data) => {
              this.createQuizForHistory(
                this.userModel?.username!,
                data.username,
                data.username
              );
            });
          } else {
            this.getUsersById(this.userId).then((data) => {
              this.createQuizForHistory(
                this.userModel?.username!,
                data.username,
                'untentschiden'
              );
            });
          }
        } else {
          this.toogleGameStart = !this.toogleGameStart;
        }
      }
    });
  }

  async getUsersById(id: number) {
    const apiUrl: string = 'http://localhost:3000/api/users/' + id;

    return await lastValueFrom(this.http.get<any>(apiUrl));
  }

  checkValue(answer: string, num: number) {
    let result: boolean = false;
    this.randomQuestions[num]?.correctAnswers!.forEach((element) => {
      if (answer == element) {
        result = true;
      }
    });
    return result;
  }

  pointCalc() {
    let sum = 0;
    this.counterArr.forEach((element) => {
      if (element) {
        sum++;
      }
    });

    if (this.enemySum > this.sum) {
      this.isWin = 2;
    } else if (this.enemySum < this.sum) {
      this.isWin = 1;
    } else {
      this.isWin = 0;
    }

    if (sum == 0) {
      sum = -1;
    }
    return sum;
  }

  async createQuizForHistory(
    username1: string,
    username2: string,
    whoWin: string
  ) {
    const apiUrl: string = 'http://localhost:3000/api/quiz/create';
    await lastValueFrom(
      this.http.post<any>(apiUrl, {
        username1,
        username2,
        whoWin,
      })
    );
  }

  async updateUsersQuizResultNumber(userId: number, whoWin: number) {
    const apiUrl = 'http://localhost:3000/api/users';
    const url = `${apiUrl}/${this.userModel?.id}/quiz-result`;

    await lastValueFrom(
      this.http.put<any>(url, {
        whoWin,
      })
    );
  }
}
