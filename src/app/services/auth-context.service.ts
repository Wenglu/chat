import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword,onAuthStateChanged,setPersistence,browserLocalPersistence  } from "firebase/auth";
import { auth } from '../firebase';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthContextService {
  private userCredentialsSource = new BehaviorSubject<any>(null);

  userCredential$: Observable<any> = this.userCredentialsSource.asObservable();

  constructor() {
    // Listen for auth state changes and update the BehaviorSubject
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userCredentialsSource.next(user);
      } else {
        this.userCredentialsSource.next(null);
      }
    });
  }

  async signIn(email: string, password: string) {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      this.userCredentialsSource.next(user);
      console.log(userCredential)
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }
}