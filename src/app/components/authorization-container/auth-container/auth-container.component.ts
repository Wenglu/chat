import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';   
import { MatIcon } from '@angular/material/icon';   
import { FormsModule } from '@angular/forms';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";   
import { Router,RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';
import { error } from 'node:console';

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [MatInputModule,CommonModule, MatFormFieldModule, MatIcon, FormsModule,RouterLink],
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss'
})
export class AuthContainerComponent {

  constructor(private router:Router){}
  errorInfo: string = '';

  userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePicture: null as File | null
  };
  
  // Method to handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.userData.profilePicture = file;
  }
  
  validation(){
    
  }
  async onSubmit(event: Event) {
    event.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        this.userData.email, 
        this.userData.password
      );
      const user = userCredential.user;
      
      let photoURL: string | null = null;
      
      if (this.userData.profilePicture) {
        const storageRef = ref(
          storage, 
          `profiles/${user.uid}/${this.userData.profilePicture.name}`
        );
        
        const snapshot = await uploadBytes(storageRef, this.userData.profilePicture);
        
        // Get the download URL
        photoURL = await getDownloadURL(snapshot.ref);
      }
      
      // Update user profile
      await updateProfile(user, {
        displayName: `${this.userData.firstName} ${this.userData.lastName}`,
        photoURL: photoURL
      });
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: `${this.userData.firstName} ${this.userData.lastName}`,
        email: this.userData.email,
        photoURL: photoURL // This will be null if no picture was uploaded
      });

      await setDoc(doc(db,"userChats",user.uid),{});
      this.router.navigate(['/MessageContainer']);
      
      console.log("User created successfully!");

    } catch (error: any) {
      this.errorInfo = this.getFirebaseErrorMessage(error.code);
    }
  }
  private getFirebaseErrorMessage(code: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Ten adres email jest już zajęty.',
      'auth/invalid-email': 'Podaj poprawny adres email.',
      'auth/operation-not-allowed': 'Rejestracja nie jest obecnie dostępna.',
      'auth/weak-password': 'Hasło musi mieć przynajmniej 6 znaków.',
      'auth/missing-password': 'Podaj hasło.',
    };

    return errorMessages[code] || 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.';
  }
}