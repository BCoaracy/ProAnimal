import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, QuerySnapshot } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { templateSourceUrl } from '@angular/compiler';
import { Animais } from './animais/animais';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pro-Animal';


  //animal = new Animais();


  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

}
