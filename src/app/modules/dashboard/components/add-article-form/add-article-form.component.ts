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
import { ActivatedRoute, Router } from '@angular/router';

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
  minimumWordsInDescription: number = 5;
  articleExists: boolean;
  articleID: string;
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      TextValidators.minimumWords(this.minimumWordsInDescription),
    ]),
    imagePath: new FormControl(''),
    imageURL: new FormControl(''),
    imageFile: new FormControl(null),
  });

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private getAuth: Auth,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get userEmail() {
    const user = this.getAuth.currentUser;
    return user ? user.email : null;
  }
  get description() {
    return this.form.get('description');
  }
  get title() {
    return this.form.get('title');
  }
  get imagePath() {
    return this.form.get('imagePath');
  }
  get imageURL() {
    return this.form.get('imageURL');
  }
  get imageFile() {
    return this.form.get('imageFile');
  }
  async ngOnInit() {
    this.errorsOnSubmit = false;
    this.isSubmitBtnDisabled = false;
    this.articleExists = false;
    this.articleID = '';
    const data = this.activatedRoute.snapshot.data;
    const queryParamID = this.activatedRoute.snapshot.paramMap.get('id');
    if (queryParamID && data['kind'] === 'edit') {
      this.articleExists = true;
      await this.setFormFields(queryParamID);
    }
  }

  async setFormFields(queryParamID: string) {
    const articleDetails = await this.articleService.getArticle(queryParamID);
    if (!articleDetails || articleDetails.creator !== this.userEmail) {
      this.route.navigate([ProjectRoutes.DASHBOARD]);
    }
    this.title.setValue(articleDetails.title);
    this.description.setValue(articleDetails.description);
    this.imageURL.setValue(articleDetails.imageURL);
    this.articleID = articleDetails.id;
  }

  storeImageAsFile(event: any) {
    this.imageFile.setValue(event.target.files[0]);
  }

  async getImageURL() {
    if (!this.imageFile.value) return '';

    const storage = getStorage();
    const filePath = 'article-images/' + new Date().getTime() + this.getAuth.currentUser.email;
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, this.imageFile.value);
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

    const imageURL = this.imageURL.value && !this.imageFile.value ? this.imageURL.value : await this.getImageURL();
    const userEmail = this.getAuth.currentUser.email;
    try {
      const userData = await this.userService.getUser(userEmail);
      const article: ArticleDetails = {
        id: this.articleID,
        title: this.title.value,
        description: this.description.value,
        author: `${userData['fname']} ${userData['lname']}`,
        creator: userEmail,
        imageURL: imageURL,
        createdAt: new Date().toUTCString(),
      };
      if (this.articleExists) {
        await this.articleService.updateArticle(article);
        console.log('article updated successfully');
      } else {
        const newArticleID = await this.articleService.storeArticle(article);
        await this.userService.assignArticleToUser(newArticleID, userEmail);
        console.log('article added successfully');
      }
      this.isSubmitBtnDisabled = false;
      this.route.navigate([ProjectRoutes.DASHBOARD]);
    } catch (error: any) {
      this.isSubmitBtnDisabled = false;
      this.commonError = 'Something went wrong. Please try again later';
      this.errorsOnSubmit = true;
      console.log(error.message);
    }
  }
}
