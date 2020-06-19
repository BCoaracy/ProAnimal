import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, QuerySnapshot } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from './Auth/user';
import { templateSourceUrl } from '@angular/compiler';
import { Animais } from './animais/animais';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pro-Animal';
  user$: Observable<User>;
  authenticated: Observable<boolean>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.user$ = this.authService.getUser();
    this.authenticated = this.authService.getAuthenticated();
   }

  ngOnInit(): void {
  }

}
