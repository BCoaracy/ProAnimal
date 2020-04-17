import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { iAnimais } from '../models/animais.model';
import { iTutores } from '../models/tutores.model';
import { ServiceFireBase } from '../core/iservicefirebase.service';

@Injectable()

export class AnimaisService extends ServiceFireBase<iAnimais>{


  // private animCollection: AngularFirestoreCollection<iAnimais>
  //   = this.afs.collection('animais');

  constructor(firestore: AngularFirestore) {
    super(iAnimais, firestore, 'animais');
  }

  getAnimal(idchip: string) {
    return this.firestore.collection<iAnimais>('animais', ref =>
      ref.where('IdChip', '==', idchip)
    ).valueChanges()
  }

  searchByCpf(cpf: string): Observable<iTutores[]> {
    return this.firestore.collection<iTutores>('tutores',
      ref => ref.orderBy('Nome').startAt(cpf).endAt(cpf + "\uf8ff"))
      .valueChanges();
  }

  // createAnimal(a: iAnimais) {

  //   if (a == this.getAnimal(a.IdChip)[0]) { console.log('registro igual') } //Não funciona dessa forma
  //   return this.animCollection.doc(a.IdChip).set(a);
  // }

  // updateAnimal(a: iAnimais) {
  //   return this.animCollection.doc(a.IdChip).set(a);
  // }

  // deleteAnimal(a: iAnimais) {
  //   return this.animCollection.doc(a.IdChip)
  //     .delete();
  // }




}

