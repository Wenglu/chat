import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  private messagesSubject = new BehaviorSubject<User[]>([]);  // Ensure type is User[]
  public messages$ = this.messagesSubject.asObservable();
  
  constructor(private http: HttpClient) {
    // Initialize by fetching users
    this.fetchMessages().subscribe();
  }

  fetchMessages(): Observable<User[]> {
    return from(this.getUsers()).pipe(
      tap(users => {
        // Ensure the messagesSubject is only updated with valid users data
        this.messagesSubject.next(users);
      }),
      map(users => users)  // Returning users, although this is redundant
    );
  }

  getMessages(): Observable<User[]> {
    return this.messages$;
  }

  private async getUsers(): Promise<User[]> {
    const q = query(collection(db, "users"));
    try {
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => {
        const data = doc.data() as User;
        return {
          name: data.displayName, // Ensure name field is used for searching
          displayName: data.displayName,
          email: data.email,
          photoURL: data.photoURL,
          uid: data.uid,
        };
      });
      return users;
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
  }

  searchUsers(searchTerm: string): Observable<User[]> {
    return this.messages$.pipe(
      map(users => {
        if (!searchTerm) {
          return users;
        }
        searchTerm = searchTerm.toLowerCase();
        return users.filter(user =>
          user.displayName.toLowerCase().includes(searchTerm)
        );
      })
    );
  }
}
