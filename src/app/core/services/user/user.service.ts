import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserDetails } from '../../interfaces/user-details';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Firestore, private getAuth: Auth) {}

  get userID() {
    const user = this.getAuth.currentUser;
    return user ? user.uid : null;
  }

  async storeUser(userData: UserDetails) {
    try {
      const docRef = doc(this.db, 'users', this.userID);
      await setDoc(docRef, userData);
    } catch (err: any) {
      console.log(err.message);
    }
  }
  async updateUser(user: any) {
    try {
      const docRef = doc(this.db, 'users', this.userID);
      await updateDoc(docRef, { ...user });
    } catch (err: any) {
      console.log(err.message);
    }
  }
  async getUser(uid: string) {
    try {
      const user: UserDetails = null;
      const docRef = doc(this.db, 'users', uid);
      return (await getDoc(docRef)).data();
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  }
  async assignArticleToUser(articleId: string, uid: string) {
    try {
      const docRef = doc(this.db, 'users', uid);
      await updateDoc(docRef, { articles: arrayUnion(articleId) });
    } catch (err: any) {
      console.log(err.message);
    }
  }
  async removeArticleFromUser(articleId: string) {
    try {
      const docRef = doc(this.db, 'users', this.userID);
      await updateDoc(docRef, { articles: arrayRemove(articleId) });
    } catch (err: any) {
      console.log(err.message);
    }
  }
}
