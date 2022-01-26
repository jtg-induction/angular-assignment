import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ArticleDetails } from 'src/app/core/interfaces/article-details';
import { ArticleService } from 'src/app/core/services/article/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles: Array<ArticleDetails>;
  userArticles: Array<ArticleDetails>;
  feedArticles: Array<ArticleDetails>;
  constructor(private articleService: ArticleService, private getAuth: Auth) {}

  get userEmail() {
    return this.getAuth.currentUser.email;
  }

  async ngOnInit() {
    this.articles = await this.articleService.getAllArticles();
    this.articles.sort((o1, o2) => {
      const t1 = new Date(o1.createdAt).getTime();
      const t2 = new Date(o2.createdAt).getTime();
      return t2 - t1;
    });
    this.userArticles = [];
    this.feedArticles = [];
    this.articles.forEach((article) => {
      if (article.creator === this.userEmail) {
        this.userArticles.push(article);
      } else {
        this.feedArticles.push(article);
      }
    });
    // await this.articleService.getUserArticles();
  }
}
