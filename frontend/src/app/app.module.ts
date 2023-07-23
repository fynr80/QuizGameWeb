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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'passwordForgot', component: PasswordForgotComponent },
      { path: 'homepage', component: HomepageComponent },
      { path: 'admin', component: AdminComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
