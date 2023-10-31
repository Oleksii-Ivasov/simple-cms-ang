import { Injectable } from '@angular/core';
import {
  Firestore,
  onSnapshot,
  collection,
  where,
  query,
  DocumentData,
  orderBy,
  getDoc,
  doc,
  updateDoc,
  increment,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afs: Firestore) {}

  loadData(
    queryType: 'featured' | 'latest' | 'category',
    id?: string
  ): Observable<{ data: Post; id: string }[]> {
    const queryMap = {
      featured: () =>
        query(collection(this.afs, 'posts'), where('isFeatured', '==', true)),
      latest: () => query(collection(this.afs, 'posts'), orderBy('createdAt')),
      category: () =>
        query(
          collection(this.afs, 'posts'),
          where('category.categoryId', '==', id)
        ),
    };

    const queryFn = queryMap[queryType];
    if (!queryFn) {
      throw new Error('Invalid query type');
    }
    return new Observable((observer) => {
      const unsubscribe = onSnapshot(
        queryFn(),
        (snapshot) => {
          const data: { data: Post; id: string }[] = snapshot.docs.map(
            (doc) => {
              const postData: DocumentData = doc.data();
              return { data: postData as Post, id: doc.id };
            }
          );
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

  async loadSinglePost(id: string) {
    try {
      const docSnap = await getDoc(doc(this.afs, 'posts', id));
      if (docSnap.exists()) {
        return docSnap.data();
      } else return false;
    } catch (error) {
      console.error('Error loading post', error);
      throw new Error('Failed to load post');
    }
  }

  async countViews(id: string) {
    await updateDoc(doc(this.afs, 'posts', id), {
      views: increment(1),
    });
  }
}
