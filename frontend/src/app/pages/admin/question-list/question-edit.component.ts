import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { questionModal } from 'app/models/question.model';
import { lastValueFrom } from 'rxjs';
import { QuestionEditModalComponent } from '../question-edit-modal/question-edit-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCreateModalComponent } from '../question-create-modal/question-create-modal.component';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css'],
})
export class QuestionEditComponent {
  showErrorMessage: boolean = false;
  errorMessage!: string;
  answers: string[] = ['', '', '', ''];

  checkboxValues: boolean[] = [false, false, false, false];

  question: string = '';
  id: number | undefined;
  allQuestions: [questionModal?] = [];

  trueAnswer: string = '';

  constructor(public http: HttpClient, private modalService: NgbModal) {
    this.getAllQuestions();
  }
  apiUrl: string = 'http://localhost:3000/api/questions';
  getAllQuestions() {
    this.http.get<any>(this.apiUrl).subscribe((data) => {
      data.result.forEach((element: any) => {
        const newQuestion = new questionModal(
          element.id,
          element.description,
          element.answers,
          element.correctAnswers
        );

        this.allQuestions!.push(newQuestion);
      });
    });
  }

  openQuestionEditModal() {
    const modalRef = this.modalService.open(QuestionEditModalComponent);
  }

  openQuestionCreateModal(question: questionModal) {
    const modalRef = this.modalService.open(QuestionCreateModalComponent);
    modalRef.componentInstance.questionn = question;
  }

  /*fillInput(question: questionModal) {
    question.answers!.forEach((element, index) => {
      this.answers[index] = element;
    });

    this.question = question.description!;
    this.id = question.id;
    this.checkboxValues[0] = false;
    this.checkboxValues[1] = false;
    this.checkboxValues[2] = false;
    this.checkboxValues[3] = false;

    switch (question.correctAnswers![0]) {
      case this.answers[0]: {
        console.log('case 0');
        this.checkboxValues[0] = true;
        this.trueAnswer = this.answers[0];
        break;
      }
      case this.answers[1]: {
        console.log('case 1');
        this.checkboxValues[1] = true;
        this.trueAnswer = this.answers[1];
        break;
      }
      case this.answers[2]: {
        console.log('case 2');
        this.checkboxValues[2] = true;
        this.trueAnswer = this.answers[2];

        break;
      }
      case this.answers[3]: {
        console.log('case 3');
        this.checkboxValues[3] = true;
        this.trueAnswer = this.answers[3];
        break;
      }
    }
  }

  async changeQuestion() {
    if (this.id === undefined) {
      this.showErrorMessage = true;
      this.errorMessage = 'Bitte eine Frage auswählen';
    } else {
      const id = this.id;
      const url = this.apiUrl + '/' + id;

      const description: string = this.question;

      const answers: String[] = this.answers;

      const correctAnswers: String[] = [this.trueAnswer];
      await lastValueFrom(
        this.http.put<any>(url, {
          id,
          description,
          answers,
          correctAnswers,
        })
      );
      console.log('Question changed');
      window.location.reload();
    }
  }

  async createQuestion() {
    const description: string = '';

    const answers: String[] = [];

    const correctAnswers: String[] = [];

    await lastValueFrom(
      this.http.post<any>(this.apiUrl, {
        description,
        answers,
        correctAnswers,
      })
    );
    console.log('Question added');
    window.location.reload();
  }
  checkCorrectAnswers(answer: string) {
    this.trueAnswer = answer;
  }*/

  async deleteQuestion(id: number | undefined) {
    const url = this.apiUrl + '/' + id;
    await lastValueFrom(this.http.delete<any>(url));
    console.log('Question deleted');
    window.location.reload();
  }
}
