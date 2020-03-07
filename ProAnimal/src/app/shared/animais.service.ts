import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Animais } from '../animais/animais';
import { Observable } from 'rxjs';
import { iAnimais } from '../models/animais.model';
import 'firebase/firestore';

@Injectable()

export class AnimaisService {

  // private afsPath = '/animais';

  private oAnimal: Animais;
  private iAnimal$: Observable<iAnimais>;

  animCollection: AngularFirestoreCollection<Animais> = this.afs.collection('animais');

  constructor(private afs: AngularFirestore) {
    // this.animCollection = afs.collection(this.afsPath);
  }


  getAnimal(chipAnimal: string): Observable<iAnimais[]> {
    // let a = this.afs.collection<Animais>('animais', ref => ref
    //   .where('IdChip', '==', chipAnimal) && ref
    //   .limit(1)).valueChanges();

    return this.afs.collection<iAnimais>('animais',
      ref => ref.where('IdChip', '==', chipAnimal))
      .valueChanges();

  }

  createAnimal(a: Animais): Promise<void> {
    // const Id_chip = this.afs.createId();
    // const Id_chip = a.IdChip
    return this.animCollection.doc<Animais>(a.IdChip)
      // return this.animCollection.doc<Animais>()
      .set({
        IdChip: a.IdChip,
        Tutor: a.Tutor,
        DataNasc: a.DataNasc,
        Especie: a.Especie,
        Nome: a.Nome,
        Observacoes: a.Observacoes,
        Raca: a.Raca,
        Tamanho: a.Tamanho,
        Ocorrencias: a.Ocorrencias
      })
      // tslint:disable-next-line:only-arrow-functions
      .then(function () {
        console.log('Document successfully written!');
      })
      // tslint:disable-next-line:only-arrow-functions
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
    // this.animCollection.add(animal);
  }

  updateAnimal(animal: Animais): Promise<void> {
    return this.animCollection.doc<Animais>(animal.IdChip)
      .update(animal);
  }

  deleteAnimal(animal: Animais): Promise<void> {
    return this.animCollection.doc<Animais>(animal.IdChip)
      .delete();
  }

  get(IdChip: string): Observable<Animais> {
    let a = this.animCollection.doc<Animais>(IdChip).valueChanges();
    return a[0];
  }

}

