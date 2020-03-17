import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { iAnimais } from '../models/animais.model';
import 'firebase/firestore';

@Injectable()

export class AnimaisService {


  private animCollection: AngularFirestoreCollection<iAnimais>
    = this.afs.collection('animais');

  constructor(private afs: AngularFirestore) {

  }


  getAnimal(IdChip: String): Observable<iAnimais[]> {
    return this.afs.collection<iAnimais>('animais',
      ref => ref.limit(1).where('IdChip', '==', IdChip))
      .valueChanges();
  }

  createAnimal(a: iAnimais) {

    if (a == this.getAnimal(a.IdChip)[0]) { console.log('registro igual') } //Não funciona dessa forma
    return this.animCollection.doc(a.IdChip).set(a);
  }

  updateAnimal(a: iAnimais) {
    return this.animCollection.doc(a.IdChip).set(a);
  }

  deleteAnimal(a: iAnimais) {
    return this.animCollection.doc(a.IdChip)
      .delete();
  }


}

