import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { questionModal } from 'app/models/question.model';
import { lastValueFrom } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question-edit-modal',
  templateUrl: './question-edit-modal.component.html',
  styleUrls: ['./question-edit-modal.component.css'],
})
export class QuestionEditModalComponent {
  showErrorMessage: boolean = false;
  errorMessage: string =
    'Bitte alle Felder Ausfüllen und die richtige Antwort auswählen';
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

  closeModal() {
    this.modalService.dismissAll();
  }
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

  async createQuestion() {
    const description: string = this.question;
    const answers: String[] = this.answers;
    const correctAnswers: String[] = [this.trueAnswer];

    if (
      description == '' ||
      correctAnswers[0] == '' ||
      answers[0] == '' ||
      answers[1] == '' ||
      answers[2] == '' ||
      answers[3] == ''
    ) {
      this.showErrorMessage = true;
      return;
    }

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
  }

  async deleteQuestion(id: number | undefined) {
    const url = this.apiUrl + '/' + id;
    await lastValueFrom(this.http.delete<any>(url));
    console.log('Question deleted');
    window.location.reload();
  }
}
