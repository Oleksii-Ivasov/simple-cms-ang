import { Injectable } from '@angular/core';
import { Sub } from '../models/sub';
import {
  Firestore,
  addDoc,
  collection,
  where,
  query,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private afs: Firestore) {}

  async addSubs(subData: Sub) {
    try {
      await addDoc(collection(this.afs, 'subscribers'), subData);
    } catch (error) {
      console.error('Error adding subscriber');
      throw new Error('Failed to add new subscriber');
    }
  }

  async checkSubs(email: string) {
    try {
      const q = query(
        collection(this.afs, 'subscribers'),
        where('email', '==', email)
      );
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      console.error('Error checking subs');
      throw new Error('Failed to check subscribers');
    }
  }
}
