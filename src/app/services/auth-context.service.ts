import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword,onAuthStateChanged,setPersistence,browserLocalPersistence  } from "firebase/auth";
import { auth, db } from '../firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc, onSnapshot, arrayUnion, Timestamp } from '@firebase/firestore';
import { v4 as uuid } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class AuthContextService {
  private userCredentialsSource = new BehaviorSubject<any>(null);
  userCredential$: Observable<User | null> = this.userCredentialsSource.asObservable();
  private clickedUserSource = new BehaviorSubject<User | null>(null);
  clickedUser$: Observable<User | null> = this.clickedUserSource.asObservable();
  private messagesSource = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSource.asObservable();
  private userChatsSource = new BehaviorSubject<any[]>([]);
  userChats$ = this.userChatsSource.asObservable();


  constructor() {


    
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
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  get currentUser(): any {
    return this.userCredentialsSource.getValue();
  }


  setClickedUser(userFriend: User) {
    this.clickedUserSource.next(userFriend);
  }

  async chatCreating(userFriend: User) {
    this.setClickedUser(userFriend);
    
    try {
      const combinedID =
        this.currentUser.uid > userFriend.uid
          ? this.currentUser.uid + userFriend.uid
          : userFriend.uid + this.currentUser.uid;
      
      const res = await getDoc(doc(db, "chats", combinedID));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        await updateDoc(doc(db, "userChats", this.currentUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: userFriend.uid,
            displayName: userFriend.displayName,
            photoURL: userFriend.photoURL
          },
          [combinedID + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", userFriend.uid), {
          [combinedID + ".userInfo"]: {
            uid: this.currentUser.uid,
            displayName: this.currentUser.displayName,
            photoURL: this.currentUser.photoURL
          },
          [combinedID + ".date"]: serverTimestamp()
        });
      }
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  }
  
  
  async getMessages(userFriend: User) {
    this.setClickedUser(userFriend);
    
    if (!this.currentUser) {
      throw new Error('User not logged in');
    }
    const combinedID =
    this.currentUser.uid > userFriend.uid
    ? this.currentUser.uid + userFriend.uid
    : userFriend.uid + this.currentUser.uid;
    
  try {
    onSnapshot(doc(db, 'chats', combinedID), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const messages = data?.['messages'] || [];
        
        this.messagesSource.next(messages);
      } else {
        this.messagesSource.next([]);
      }
    });
    
  } catch (err) {
    throw err;
  }
}

 async conversationData() {
  const currentUser = this.currentUser;

  await onSnapshot(doc(db, 'userChats', currentUser.uid), (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();

      const formattedData = Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value.userInfo,
        lastMessage: value.lastMessage?.text || '',
        date: value.date?.toDate() || new Date(),
      }));

      this.userChatsSource.next(formattedData);

    }
  });
}

async sendMessage(messageContent: string, userFriend: User) {
  this.setClickedUser(userFriend);
  
    const combinedID =
      this.currentUser.uid > userFriend.uid
        ? this.currentUser.uid + userFriend.uid
        : userFriend.uid + this.currentUser.uid;
  
    try {
      const newMessage = {
        id: uuid(),  
        text: messageContent, 
        senderId: this.currentUser.uid,  
        date: Timestamp.now(),  
      };

      await updateDoc(doc(db, "chats", combinedID), {
        messages: arrayUnion(newMessage),
      });

      await updateDoc(doc(db, "userChats", this.currentUser.uid), {
        [combinedID + ".lastMessage"]: {
          text: messageContent,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", userFriend.uid), {
        [combinedID + ".lastMessage"]: {
          text: messageContent,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });
      

      } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  }
  
}