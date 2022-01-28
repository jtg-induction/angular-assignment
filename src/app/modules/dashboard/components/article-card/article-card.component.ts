import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { ProjectRoutes } from 'src/app/constants';
import { ArticleDetails } from 'src/app/core/interfaces/article-details';
import { DeleteArticleComponent } from '../delete-article/delete-article.component';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input()
  article: ArticleDetails;
  routeToArticleDetail: string;
  routeToEditArticle: string;

  constructor(private getAuth: Auth, public dialog: MatDialog) {}

  get userID() {
    const user = this.getAuth.currentUser;
    return user ? user.uid : null;
  }

  get articleID() {
    return this.article.id;
  }

  ngOnInit(): void {
    this.routeToArticleDetail = ProjectRoutes.ARTICLE_DETAIL.replace(':id', this.article.id);
    this.routeToEditArticle = ProjectRoutes.EDIT_ARTICLE.replace(':id', this.article.id);
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteArticleComponent, {
      data: {
        articleID: this.articleID,
      },
    });
  }
}
