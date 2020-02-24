import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Animais } from '../animais/animais';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private db: AngularFirestore
  ) { }

  getAnimal(chipAnimal: number) {
    return this.db.collection<Animais>('animais', ref => ref.where('Id_chip', '==', chipAnimal) && ref.limit(1)).valueChanges();
  }
}
