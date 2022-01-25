import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';

@NgModule({
  declarations: [DashboardComponent, ArticleCardComponent],
  imports: [SharedModule],
})
export class DashboardModule {}
