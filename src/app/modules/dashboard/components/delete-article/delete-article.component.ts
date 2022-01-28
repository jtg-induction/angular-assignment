import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.scss'],
})
export class DeleteArticleComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { articleID: string },
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  async deleteArticle() {
    await this.articleService.deleteArticle(this.data.articleID);
    await this.userService.removeArticleFromUser(this.data.articleID);
    console.log('article deleted');
  }
}
