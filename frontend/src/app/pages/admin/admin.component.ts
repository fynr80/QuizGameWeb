import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { questionModal } from 'app/models/question.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  question: string = '';
  id: number | undefined;
  allQuestions: [questionModal?] = [];

  trueAnswer: string = '';

  checkBox1: boolean = false;
  checkBox2: boolean = false;
  checkBox3: boolean = false;
  checkBox4: boolean = false;

  constructor(public http: HttpClient) {
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

  fillInput(question: questionModal) {
    this.answer1 = question.answers![1];
    this.answer2 = question.answers![2];
    this.answer3 = question.answers![3];
    this.answer4 = question.answers![4];

    this.question = question.description!;

    this.id = question.id;
  }

  checkCorrectAnswers() {
    if (this.checkBox1 === true) {
      this.trueAnswer = this.answer1;
      this.checkBox2 = false;
      this.checkBox3 = false;
      this.checkBox4 = false;
    } else if (this.checkBox2 === true) {
      this.trueAnswer = this.answer2;
      this.checkBox1 = false;
      this.checkBox3 = false;
      this.checkBox4 = false;
    } else if (this.checkBox3 === true) {
      this.trueAnswer = this.answer3;
      this.checkBox1 = false;
      this.checkBox2 = false;
      this.checkBox4 = false;
    } else if (this.checkBox4 === true) {
      this.trueAnswer = this.answer4;
      this.checkBox1 = false;
      this.checkBox2 = false;
      this.checkBox3 = false;
    }
  }

  async changeQuestion() {
    if (this.id === undefined) {
      console.log('Error MSG NO ID');
    } else {
      const id = this.id;
      const url = this.apiUrl + '/' + id;

      const description: string = this.question;

      const answers: String[] = [
        this.answer1,
        this.answer2,
        this.answer3,
        this.answer4,
      ];

      const correctAnswers: String[] = [
        this.answer1,
        this.answer2,
        this.answer3,
        this.answer4,
      ];
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

  async deleteQuestion(id: number | undefined) {
    const url = this.apiUrl + '/' + id;
    await lastValueFrom(this.http.delete<any>(url));
    console.log('Question deleted');
    window.location.reload();
  }
}
