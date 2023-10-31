import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private afs: Firestore) {}

  async addComment(commentData: {
    name: string;
    content: string;
    postId: string;
  }) {
    const commentObjData = { ...commentData, createdAt: new Date() };
    try {
      await addDoc(collection(this.afs, 'comments'), commentObjData);
    } catch (error) {
      console.error('Error adding comment');
      throw new Error('Failed to add new comment');
    }
  }

  async countComments(postId: string) {
    const q = query(
      collection(this.afs, 'comments'),
      where('postId', '==', postId)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }

  getComments(postId: string): Observable<Comment[]> {
    return new Observable((observer) => {
      const unsubscribe = onSnapshot(
        query(collection(this.afs, 'comments'), where('postId', '==', postId)),
        (snapshot) => {
          const data: Comment[] = [];
          snapshot.docs.forEach((doc) => {
            data.push({
              name: doc.data()['name'],
              content: doc.data()['content'],
              id: doc.id,
              postId: doc.data()['postId'],
              createdAt: doc.data()['createdAt'],
            });
          });
          observer.next(data);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
