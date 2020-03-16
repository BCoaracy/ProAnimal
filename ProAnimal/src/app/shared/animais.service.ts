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


  getAnimal(chipAnimal: string): Observable<iAnimais[]> {
    return this.afs.collection<iAnimais>('animais',
      ref => ref.where('IdChip', '==', chipAnimal))
      .valueChanges();
  }

  createAnimal(a: iAnimais) {
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

