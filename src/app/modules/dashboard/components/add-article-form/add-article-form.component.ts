import { Component, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Firestore } from 'firebase/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextValidators } from '../../../../core/validators/text.validators';
import { ArticleDetails } from '../../../../core/interfaces/article-details';
import { ProjectRoutes } from 'src/app/constants';
import { UserService } from '../../../../core/services/user/user.service';
import { Auth, User } from '@angular/fire/auth';
import { UserDetails } from '../../../../core/interfaces/user-details';
import { ArticleService } from '../../../../core/services/article/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article-form',
  templateUrl: './add-article-form.component.html',
  styleUrls: ['./add-article-form.component.scss'],
})
export class AddArticleFormComponent implements OnInit {
  errorsOnSubmit: boolean;
  commonError: string;
  isSubmitBtnDisabled: boolean;
  dashboardPath = `/${ProjectRoutes.SIGNIN}`;

  selectedFile: File = null;
  downloadURL: Observable<string>;
  imageFile: File;
  minimumWordsInDescription: number = 5;
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      TextValidators.minimumWords(this.minimumWordsInDescription),
    ]),
    imagePath: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private getAuth: Auth,
    private route: Router
  ) {}

  get description() {
    return this.form.get('description');
  }
  get title() {
    return this.form.get('title');
  }
  get imagePath() {
    return this.form.get('imagePath');
  }
  ngOnInit(): void {
    this.errorsOnSubmit = false;
    this.isSubmitBtnDisabled = false;
  }

  storeImageAsFile(event: any) {
    this.imageFile = event.target.files[0];
  }

  async getImageURL() {
    if (!this.imageFile) return '';

    const storage = getStorage();
    const filePath = 'article-images/' + new Date().getTime() + this.getAuth.currentUser.email;
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, this.imageFile);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  }

  async saveArticle() {
    if (this.title.errors || this.description.errors) {
      this.commonError = 'Please fill valid details';
      this.errorsOnSubmit = true;
      return;
    }
    this.errorsOnSubmit = false;
    this.isSubmitBtnDisabled = true;
    const imageURL = await this.getImageURL();
    const userEmail = this.getAuth.currentUser.email;
    try {
      const userData = await this.userService.getUser(userEmail);
      const article: ArticleDetails = {
        title: this.title.value,
        description: this.description.value,
        author: `${userData['fname']} ${userData['lname']}`,
        creator: userEmail,
        imageURL: imageURL,
        createdAt: new Date().toUTCString(),
      };
      const articleId = await this.articleService.storeArticle(article);
      await this.userService.assignArticleToUser(articleId, userEmail);
      this.isSubmitBtnDisabled = false;
      console.log('article addded successfully');
      this.route.navigate([ProjectRoutes.DASHBOARD]);
    } catch (error: any) {
      this.isSubmitBtnDisabled = false;
      this.commonError = 'Something went wrong. Please try again later';
      this.errorsOnSubmit = true;
      console.log(error.message);
    }
  }
}
