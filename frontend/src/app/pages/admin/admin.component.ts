import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { questionModal } from 'app/models/question.model';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  showQuestionEdit: boolean = true;
  showUsers: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    //this.getAllQuestions();
  }
  apiUrl: string = 'http://localhost:3000/api/questions';
  signOut() {
    console.log('signOut');
    this.authService.signOut('', '');

    this.router.navigate(['/login']);

    //localStorage.removeItem('userInfo');
  }
}
