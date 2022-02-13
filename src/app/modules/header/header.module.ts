import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared/shared.module';
import { AddArticleButtonComponent } from './components/add-article-button/add-article-button.component';

@NgModule({
  declarations: [HeaderComponent, AddArticleButtonComponent],
  imports: [SharedModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
