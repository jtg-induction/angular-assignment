import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { ArticleDetails } from '../../interfaces/article-details';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private db: Firestore, private getAuth: Auth) {}

  get userEmail() {
    return this.getAuth.currentUser.email;
  }

  async storeArticle(article: ArticleDetails) {
    const docRef = await addDoc(collection(this.db, 'articles'), article);
    return docRef.id;
  }

  async getArticle(id: string) {
    try {
      const docRef = doc(this.db, 'articles', id);
      const data = (await getDoc(docRef)).data();
      const article: ArticleDetails = {
        id: id,
        author: data['author'],
        title: data['title'],
        description: data['description'],
        createdAt: data['createdAt'],
        imageURL: data['imageURL'],
        creator: data['creator'],
      };
      return article;
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  }

  async getUserArticles() {
    try {
      const docRef = doc(this.db, 'users', this.userEmail);
      const response = (await getDoc(docRef)).data();
      return response['articles'];
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  }

  async getAllArticles() {
    // return onSnapshot(collection(this.db, 'articles'), (collec) => {
    //   let obj = collec.docs;
    //   // console.log('Current data: ', );
    // });
    const docRef = collection(this.db, 'articles');
    const docs = await getDocs(docRef);
    const articles: Array<ArticleDetails> = [];
    docs.forEach((doc) => {
      const data = doc.data();
      // console.log(doc.id);

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
    return articles;
  }
}
