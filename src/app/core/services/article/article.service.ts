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
  Unsubscribe,
  updateDoc,
} from 'firebase/firestore';
import { ArticleDetails } from '../../interfaces/article-details';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private db: Firestore, private getAuth: Auth) {}

  unsub: Unsubscribe;

  get userID() {
    const user = this.getAuth.currentUser;
    return user ? user.uid : null;
  }

  async storeArticle(article: ArticleDetails) {
    const docRef = await addDoc(collection(this.db, 'articles'), article);
    return docRef.id;
  }

  async updateArticle(id: string, article: any) {
    try {
      const docRef = doc(this.db, 'articles', id);
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
      const docRef = doc(this.db, 'users', this.userID);
      const response = (await getDoc(docRef)).data();
      return response['articles'];
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  }

  async getAllArticles(callBack: (collec: QuerySnapshot<DocumentData>) => void) {
    this.unsub = onSnapshot(collection(this.db, 'articles'), callBack);
  }
}
