import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProjectRoutes } from './constants';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { AddArticleFormComponent } from './modules/dashboard/components/add-article-form/add-article-form.component';
import { ArticleDetailComponent } from './modules/dashboard/components/article-detail/article-detail.component';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo([ProjectRoutes.SIGNIN]);
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
    path: ProjectRoutes.ADD_ARTICLE,
    component: AddArticleFormComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth },
  },
  {
    path: `${ProjectRoutes.ARTICLE_DETAIL}/:id`,
    children: [
      {
        path: 'edit',
        component: AddArticleFormComponent,
        data: {
          kind: 'edit',
        },
      },
    ],
    pathMatch: 'full',
    component: ArticleDetailComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth },
  },
  {
    path: `${ProjectRoutes.ARTICLE_DETAIL}/:id/edit`,
    component: AddArticleFormComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth, kind: 'edit' },
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
