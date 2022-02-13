import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProjectRoutes } from './constants';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo([`${ProjectRoutes.AUTH}/${ProjectRoutes.SIGNIN}`]);
const redirectLoggedInToDashboard = () => redirectLoggedInTo([ProjectRoutes.DASHBOARD]);

const routes: Routes = [
  {
    path: ProjectRoutes.DASHBOARD,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((r) => r.DashboardModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth },
  },
  {
    path: ProjectRoutes.AUTH,
    loadChildren: () => import('./modules/auth/auth.module').then((r) => r.AuthModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
