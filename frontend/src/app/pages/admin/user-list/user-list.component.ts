import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'app/models/user.model';
import { AuthService } from 'app/pages/login/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  allUsers: [UserModel?] = [];
  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private modalService: NgbModal
  ) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get<any>('http://localhost:3000/api/users').subscribe((data) => {
      data.result.forEach((element: any) => {
        const newUser = new UserModel(
          0,
          [],
          '',
          element.username,
          element.email,
          element.id
        );

        this.allUsers!.push(newUser);
      });
    });
    console.log(this.allUsers);
  }
}
