import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDetails } from 'src/app/core/interfaces/article-details';
import { ArticleService } from 'src/app/core/services/article/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleId: string;
  article: ArticleDetails;

  constructor(private activatedoute: ActivatedRoute, private articleService: ArticleService) {}

  async ngOnInit() {
    this.articleId = this.activatedoute.snapshot.paramMap.get('id');
    this.article = await this.articleService.getArticle(this.articleId);
  }
}
