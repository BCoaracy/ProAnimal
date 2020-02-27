import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Animais } from '../animais/animais';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  private dbPath = '/animais';

  animaisRef: AngularFirestoreCollection<Animais> = null;

  constructor(private db: AngularFirestore) {
    this.animaisRef = db.collection(this.dbPath);
  }

  createAnimal(animal: Animais): void {
    this.animaisRef.add(animal);
  }

  updateAnimal(key: string, value: any): Promise<void> {
    return this.animaisRef.doc(key).update(value);
  }

  deleteAnimal(key: string): Promise<void> {
    return this.animaisRef.doc(key).delete();
  }

  getAnimal(chipAnimal: number) {
    return this.db.collection<Animais>('animais', ref => ref.where('Id_chip', '==', chipAnimal) && ref.limit(1)).valueChanges();
  }
}
