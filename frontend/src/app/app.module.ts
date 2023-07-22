import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [AppComponent, RegistrationComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
