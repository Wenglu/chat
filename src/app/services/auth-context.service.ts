import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword,onAuthStateChanged,setPersistence,browserLocalPersistence  } from "firebase/auth";
import { auth, db } from '../firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc,collection, addDoc } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthContextService {
  private userCredentialsSource = new BehaviorSubject<any>(null);
  private clickedUserSource = new BehaviorSubject<User | null>(null);
  userCredential$: Observable<User | null> = this.userCredentialsSource.asObservable();
  clickedUser$: Observable<User | null> = this.clickedUserSource.asObservable();

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
      }
      } catch (err) {
      console.error("Error in chatCreating:", err);
    }
  }

  async getMessages(userFriend: User) {
    this.setClickedUser(userFriend);
    const combinedID =
        this.currentUser.uid > userFriend.uid
          ? this.currentUser.uid + userFriend.uid
          : userFriend.uid + this.currentUser.uid;

    try {
      const messagesRef = collection(db, "chats", combinedID, "messages");
      const querySnapshot = await getDocs(messagesRef);
  
      const messages = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      console.log("Messages:", messages);
      return messages;
    } catch (err) {
      console.error("Error fetching messages:", err);
      throw err;
    }
  }


  async sendMessage(messageContent: string, userFriend: User) {
    this.setClickedUser(userFriend);
    const combinedID =
        this.currentUser.uid > userFriend.uid
          ? this.currentUser.uid + userFriend.uid
          : userFriend.uid + this.currentUser.uid;

    try {
      const messagesRef = collection(db, "chats", combinedID, "messages");
  
      const newMessage = {
        content: messageContent,
        senderUID: this.currentUser.uid,
        timestamp: serverTimestamp() 
      };
  
      await addDoc(messagesRef, newMessage);
  
      console.log("Wiadomość wysłana:", newMessage);
    } catch (err) {
      console.error("Błąd podczas wysyłania wiadomości:", err);
      throw err;
    }
  }
}