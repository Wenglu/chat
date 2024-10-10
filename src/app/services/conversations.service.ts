// conversations.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  private messagesJson = 'https://jsonplaceholder.typicode.com/users';
  
  private messagesSubject = new BehaviorSubject<any[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  fetchMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.messagesJson).pipe(
      tap((messages) => {
        this.messagesSubject.next(messages);
      })
    );
  }

  getMessages(): Observable<any[]> {
    return this.messages$;
  }
}
