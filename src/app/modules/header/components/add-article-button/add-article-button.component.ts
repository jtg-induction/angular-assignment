import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectRoutes } from 'src/app/constants';

@Component({
  selector: 'app-add-article-button',
  templateUrl: './add-article-button.component.html',
  styleUrls: ['./add-article-button.component.scss'],
})
export class AddArticleButtonComponent {
  constructor(private route: Router) {}

  openAddArticleForm() {
    this.route.navigate([ProjectRoutes.ADD_ARTICLE]);
  }
}
