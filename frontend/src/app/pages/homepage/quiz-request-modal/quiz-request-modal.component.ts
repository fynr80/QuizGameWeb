import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { questionModal } from 'app/models/question.model';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';
import { FriendService } from 'app/services/friend-service';
@Component({
  selector: 'app-quiz-request-modal',
  templateUrl: './quiz-request-modal.component.html',
  styleUrls: ['./quiz-request-modal.component.css'],
})
export class QuizRequestModalComponent {
  @Input() userIds: number | undefined;

  userModel: UserModel | undefined;
  //randomQuestions: [questionModal?] = [];

  constructor(
    private modalService: NgbModal,
    private friendService: FriendService,
    private authService: AuthService,
    public http: HttpClient
  ) {
    this.authService.getSession().subscribe((data) => {
      this.userModel = data;
    });
  }
  acceptRequest(category: number) {
    this.friendService.sendAcceptGameRequest(
      this.userIds!,
      this.userModel!.id!,
      category
    );
    this.closeModal();
  }

  declineRequest() {
    console.log('declineRequest');
    this.closeModal();
  }
  closeModal() {
    this.modalService.dismissAll();
  }
}
