import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
} from 'firebase/firestore';
import { ArticleDetails } from '../../interfaces/article-details';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private db: Firestore, private getAuth: Auth) {}

  get userEmail() {
    const user = this.getAuth.currentUser;
    return user ? user.email : null;
  }

  async storeArticle(article: ArticleDetails) {
    const docRef = await addDoc(collection(this.db, 'articles'), article);
    return docRef.id;
  }

  async updateArticle(article: ArticleDetails) {
    try {
      const docRef = doc(this.db, 'articles', article.id);
      await updateDoc(docRef, { ...article });
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async deleteArticle(articleID: string) {
    try {
      const docRef = doc(this.db, 'articles', articleID);
      await deleteDoc(docRef);
    } catch (err: any) {
      console.log(err.message);
    }
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

  async getAllArticles(callBack: (collec: QuerySnapshot<DocumentData>) => void) {
    onSnapshot(collection(this.db, 'articles'), callBack);
    // const docRef = collection(this.db, 'articles');
    // const docs = await getDocs(docRef);
    // const articles: Array<ArticleDetails> = [];
    // docs.forEach((doc) => {
    //   const data = doc.data();
    //   // console.log(doc.id);

    //   const article: ArticleDetails = {
    //     id: doc.id,
    //     author: data['author'],
    //     title: data['title'],
    //     description: data['description'],
    //     createdAt: data['createdAt'],
    //     imageURL: data['imageURL'],
    //     creator: data['creator'],
    //   };
    //   articles.push(article);
    // });
    // return articles;
  }
}
