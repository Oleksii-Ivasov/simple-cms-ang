import { Injectable } from '@angular/core';
import {
  authState,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.initLoggedStatus();
  }

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  async login(email: string, password: string) {
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.loadUser();
      this.loggedIn.next(true);
    } catch (error) {
      console.error('Authentication error: ', error);
      throw new Error('Authentication error');
    }
  }

  private initLoggedStatus() {
    const auth = getAuth();
    authState(auth).subscribe((user) => {
      const isLoggedIn = !!user;
      this.loggedIn.next(isLoggedIn);
    });
  }

  loadUser() {
    const auth = getAuth();
    authState(auth).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });

  }

  loginAfterGoogle(user: any) {
    this.loggedIn.next(true);
    localStorage.setItem('user', JSON.stringify(user));
  }

  async logOut() {
    const auth = getAuth();
    try {
      await signOut(auth);
      this.loggedIn.next(false)
    } catch(error) {
      throw new Error('Error during logout');
    }
  }

  isLoggedIn() {
    return this.loggedIn.asObservable()
  }
}
