import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, QuerySnapshot } from 'angularfire2/firestore';
import { Animais } from './models/animais.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pro-Animal';


  animal: any;

  microChip: any;

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

  searchAnimals(chipAnimal: number) {
    this.animal = this.db.collection<Animais>('animais', ref => ref.where('Id_chip', '==', chipAnimal) && ref.limit(1)).valueChanges();
  }

}
