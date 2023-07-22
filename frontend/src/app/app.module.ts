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

@NgModule({
  declarations: [AppComponent, RegistrationComponent, LoginComponent, PasswordForgotComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'passwordForgot', component: PasswordForgotComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
