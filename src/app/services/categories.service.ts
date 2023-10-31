import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryArray } from '../models/category-array';
import {
  Firestore,
  collection,
  onSnapshot,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private afs: Firestore) {}

  loadData(): Observable<CategoryArray[]> {
    return new Observable<CategoryArray[]>((observer) => {
      const unsubscribe = onSnapshot(
        collection(this.afs, 'categories'),
        (snapshot) => {
          let data: CategoryArray[] = [];
          snapshot.docs.forEach((doc) => {
            data.push({
              data: doc.data(),
              id: doc.id,
            });
          });
          observer.next(data);
        },
        (error) => {
          observer.error(error);
        }
      );
      return () => {
        unsubscribe();
      };
    });
  }
}
