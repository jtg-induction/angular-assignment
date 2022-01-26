import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { TruncatePipe } from 'src/app/core/pipes/truncate/truncate.pipe';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { AddArticleFormComponent } from './components/add-article-form/add-article-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ArticleCardComponent,
    ArticleListComponent,
    TruncatePipe,
    ArticleDetailComponent,
    AddArticleFormComponent,
  ],
  imports: [SharedModule],
})
export class DashboardModule {}
