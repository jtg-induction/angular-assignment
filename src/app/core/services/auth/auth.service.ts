import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Database } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { UserDetails } from '../../interfaces/user-details';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private getAuth: Auth) {}

  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.getAuth, email, password);
  }

  logIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.getAuth, email, password);
  }

  logOut() {
    return signOut(this.getAuth);
  }
}
