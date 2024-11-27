import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; 
import { User } from '../models/user'; 

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  private messagesSubject = new BehaviorSubject<User[]>([]);

  constructor() {
    this.fetchMessages();
  }

  private fetchMessages(): void {
    const usersCollection = collection(db, 'users');
    onSnapshot(usersCollection, (snapshot) => {
      const users: User[] = snapshot.docs.map((doc) => {
        const data = doc.data() as User;
        return {
          name: data.displayName || '',
          displayName: data.displayName || '',
          email: data.email || '',
          photoURL: data.photoURL || '',
          uid: data.uid || '',
        };
      });
      this.messagesSubject.next(users);
    });
  }

  getMessages(): Observable<User[]> {
    return this.messagesSubject.asObservable();
  }
  searchUsers(searchTerm: string): Observable<User[]> {
    return this.messagesSubject.asObservable().pipe(
      map((users) => {
        if (!searchTerm) {
          return users;
        }

        searchTerm = searchTerm.toLowerCase();
        return users.filter((user) =>
          user.displayName.toLowerCase().includes(searchTerm)
        );
      })
    );
  }
}
