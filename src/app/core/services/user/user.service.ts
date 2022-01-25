import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserDetails } from '../../interfaces/user-details';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Firestore) {}

  storeUser(userData: UserDetails) {
    const docRef = doc(this.db, 'article-viewer/users/authenticated-users', userData.email);
    setDoc(docRef, userData).catch((error) => console.log(error.message));
  }
  getUser() {
    const docRef = doc(this.db, 'article-viewer/users/authenticated-users');
    return getDoc(docRef);
  }
}
