import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProjectRoutes } from './constants';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo([ProjectRoutes.ROOT]);
const redirectLoggedInToDashboard = () => redirectLoggedInTo([ProjectRoutes.DASHBOARD]);

const routes: Routes = [
  {
    path: ProjectRoutes.ROOT,
    loadChildren: () => import('./modules/auth/auth.module').then((r) => r.AuthModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: ProjectRoutes.DASHBOARD,
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth },
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
