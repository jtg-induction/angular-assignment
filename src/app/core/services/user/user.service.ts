import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserDetails } from '../../interfaces/user-details';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Firestore, private getAuth: Auth) {}

  get userEmail() {
    const user = this.getAuth.currentUser;
    return user ? user.email : null;
  }

  storeUser(userData: UserDetails) {
    const docRef = doc(this.db, 'users', userData.email);
    setDoc(docRef, userData).catch((error) => console.log(error.message));
  }
  async getUser(email: string) {
    try {
      const user: UserDetails = null;
      const docRef = doc(this.db, 'users', email);
      return (await getDoc(docRef)).data();
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  }
  async assignArticleToUser(articleId: string, email: string) {
    try {
      const docRef = doc(this.db, 'users', email);
      await updateDoc(docRef, { articles: arrayUnion(articleId) });
    } catch (err: any) {
      console.log(err.message);
    }
  }
}
