import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectRoutes } from 'src/app/constants';
import { AddArticleFormComponent } from './components/add-article-form/add-article-form.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

const routes: Routes = [
  {
    path: ProjectRoutes.DASHBOARD,
    component: ArticleListComponent,
  },
  {
    path: ProjectRoutes.ADD_ARTICLE,
    component: AddArticleFormComponent,
  },
  {
    path: ProjectRoutes.ARTICLE_DETAIL,
    component: ArticleDetailComponent,
  },
  {
    path: ProjectRoutes.EDIT_ARTICLE,
    component: AddArticleFormComponent,
    data: { kind: 'edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRouteModule {}
