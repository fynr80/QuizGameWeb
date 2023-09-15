import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PasswordForgotComponent } from './pages/password-forgot/password-forgot.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProfilComponent } from './pages/homepage/profil/profil.component';
import { QuizGameComponent } from './pages/homepage/quiz-game/quiz-game.component';
import { StatistikComponent } from './pages/homepage/statistik/statistik.component';
import { VerlaufComponent } from './pages/homepage/verlauf/verlauf.component';
import { FormsModule } from '@angular/forms';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { PlayerModalComponent } from './pages/homepage/player-modal/player-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { PlyerEditComponent } from './pages/homepage/plyer-edit/plyer-edit.component';
import { PasswordEditComponent } from './pages/homepage/password-edit/password-edit.component';
import { FriendRequestComponent } from './pages/homepage/friend-request/friend-request.component';
import { QuestionEditComponent } from './pages/admin/question-list/question-edit.component';
import { QuestionEditModalComponent } from './pages/admin/question-edit-modal/question-edit-modal.component';
import { QuestionCreateModalComponent } from './pages/admin/question-create-modal/question-create-modal.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { MatIconModule } from '@angular/material/icon';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FriendService } from './services/friend-service';
import { QuizStartComponent } from './pages/homepage/quiz-start/quiz-start.component';
import { QuizRequestModalComponent } from './pages/homepage/quiz-request-modal/quiz-request-modal.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PasswordForgotComponent,
    HomepageComponent,
    AdminComponent,
    ProfilComponent,
    QuizGameComponent,
    StatistikComponent,
    VerlaufComponent,
    PieChartComponent,
    PlayerModalComponent,
    PlyerEditComponent,
    PasswordEditComponent,
    FriendRequestComponent,
    QuestionEditComponent,
    QuestionEditModalComponent,
    QuestionCreateModalComponent,
    UserListComponent,
    QuizStartComponent,
    QuizRequestModalComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot([
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
        canActivate: [LoginGuard],
      },
      { path: 'passwordForgot', component: PasswordForgotComponent },
      {
        path: 'homepage',
        component: HomepageComponent,
        canActivate: [AuthGuard],
      },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    ]),
  ],
  providers: [FriendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
