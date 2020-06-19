import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User } from '../Auth/user';
import { switchMap, catchError } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  //private user: Observable<firebase.User>;
  private userCollection: AngularFirestoreCollection<User> =
    this.afs.collection('users');

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    //this.user = afAuth.authState;
  }

  login(email: string, password: string): Observable<User> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
    .pipe(
      switchMap((u: firebase.auth.UserCredential)=> this.userCollection.doc<User>(u.user.uid).valueChanges())
    )
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  resetPassword(email: any) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  register(user: User): Observable<boolean> {
    return from(this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.senha))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) =>
          this.userCollection.doc(u.user.uid)
            .set({ ...user, id: u.user.uid })
            .then(() => true)
        ),
        catchError((error) => throwError(error))
      )
  }

}
