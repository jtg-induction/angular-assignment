import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProjectRoutes } from 'src/app/constants';

const routes = [
  {
    path: ProjectRoutes.ROOT,
    redirectTo: ProjectRoutes.SIGNIN,
    pathMatch: 'full',
  },
  {
    path: ProjectRoutes.SIGNUP,
    component: SignupComponent,
  },
  {
    path: ProjectRoutes.SIGNIN,
    component: SigninComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRouteModule {}
