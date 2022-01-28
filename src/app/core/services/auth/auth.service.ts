import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Database } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { UserDetails } from '../../interfaces/user-details';
import { ArticleService } from '../article/article.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private getAuth: Auth, private articleService: ArticleService) {}
  async createUser(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(this.getAuth, email, password);
    return cred.user.uid;
  }

  async logIn(email: string, password: string) {
    await signInWithEmailAndPassword(this.getAuth, email, password);
  }

  async logOut() {
    try {
      this.articleService.unsub();
      await signOut(this.getAuth);
    } catch (err: any) {
      console.log(err.message);
    }
  }
}
