import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
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

  get userID() {
    const user = this.getAuth.currentUser;
    return user ? user.uid : null;
  }

  callBackForArticles(collec: QuerySnapshot<DocumentData>) {
    const articles: Array<ArticleDetails> = [];
    collec.forEach((doc) => {
      const data = doc.data();
      const article: ArticleDetails = {
        id: doc.id,
        author: data['author'],
        title: data['title'],
        description: data['description'],
        createdAt: data['createdAt'],
        imageURL: data['imageURL'],
        creator: data['creator'],
      };
      articles.push(article);
    });
    this.articles = articles;
    this.articles.sort((o1, o2) => {
      const t1 = new Date(o1.createdAt).getTime();
      const t2 = new Date(o2.createdAt).getTime();
      return t2 - t1;
    });
    this.userArticles = [];
    this.feedArticles = [];
    this.articles.forEach((article) => {
      if (article.creator === this.userID) {
        this.userArticles.push(article);
      } else {
        this.feedArticles.push(article);
      }
    });
  }

  async ngOnInit() {
    await this.articleService.getAllArticles(this.callBackForArticles.bind(this));
    // await this.articleService.getUserArticles();
  }
}
