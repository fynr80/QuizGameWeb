import { Component, Input } from '@angular/core';
import { questionModal } from 'app/models/question.model';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { FriendService } from 'app/services/friend-service';

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
  showStatistic: boolean = false;
  constructor(
    private authService: AuthService,
    private friendService: FriendService
  ) {
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });
    this.getOnSubmitAnswer();
  }

  buttonclicked(answer: string, num: number) {
    console.log(this.randomQuestions.length);
    this.userSubmit = true;
    if (this.userModel?.id == this.friendId) {
      this.newid = this.userId;
      this.toogleGameStart = !this.toogleGameStart;
    } else {
      this.newid = this.friendId;
      this.toogleGameStart = !this.toogleGameStart;
    }
    if (this.friendSubmit == true) {
      this.questionNumber++;
      this.friendSubmit = false;
      this.userSubmit = false;
    }
    this.counterArr[num] = this.checkValue(answer, num);
    this.friendService.sendOnSubmitAnswer(this.newid);
    console.log(this.questionNumber);
    if (this.questionNumber == 1) {
      console.log('sdfsdfs');
      this.showStatistic == true;
      this.toogleGameStart == false;
    }
  }

  async getOnSubmitAnswer() {
    this.friendService.getOnSubmitAnswer().subscribe((data) => {
      if (data) {
        this.friendSubmit = true;
        this.toogleGameStart = !this.toogleGameStart;
      }
      if (this.userSubmit == true) {
        this.questionNumber++;
        this.userSubmit = false;
        this.friendSubmit = false;
      }
    });
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
}
