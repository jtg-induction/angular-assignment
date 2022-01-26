import { Component, Input, OnInit } from '@angular/core';
import { ProjectRoutes } from 'src/app/constants';
import { ArticleDetails } from 'src/app/core/interfaces/article-details';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input()
  article: ArticleDetails;
  routeToArticleDetail: string;

  constructor() {}

  ngOnInit(): void {
    this.routeToArticleDetail = `/${ProjectRoutes.ARTICLE_DETAIL}/${this.article.id}`;
  }
}
