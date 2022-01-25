import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { RouterModule } from '@angular/router';
import { AuthRouteModule } from './auth-route.module';

@NgModule({
  declarations: [AuthComponent, SigninComponent, SignupComponent],
  imports: [SharedModule, AuthRouteModule],
})
export class AuthModule {}
