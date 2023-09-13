import { Component, Input } from '@angular/core';
import { questionModal } from 'app/models/question.model';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.css'],
})
export class QuizGameComponent {
  @Input() randomQuestions: [questionModal?] = [];
  question = this.randomQuestions[0]?.description; //Undefined
}
