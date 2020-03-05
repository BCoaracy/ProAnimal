import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Animais } from '../animais/animais';
import { Observable } from 'rxjs';
import { iAnimais } from '../models/animais.model';

@Injectable()

export class AnimaisService {

  private dbPath = '/animais';

  private oAnimal: Animais;
  private iAnimal$: Observable<iAnimais>;

  animaisRef: AngularFirestoreCollection<Animais> ;

  constructor(private db: AngularFirestore) {
    this.animaisRef = db.collection(this.dbPath);
  }

  createAnimal(a: Animais): Promise<void> {
    // const Id_chip = this.db.createId();
    // const Id_chip = a.IdChip
    return this.animaisRef.doc<Animais>(a.IdChip)
    // return this.animaisRef.doc<Animais>()
    .set({IdChip: a.IdChip,
          Tutor: a.Tutor,
          DataNasc: a.DataNasc,
          Especie: a.Especie,
          Nome: a.Nome,
          Observacoes: a.Observacoes,
          Raca: a.Raca,
          Tamanho: a.Tamanho,
          Ocorrencias: a.Ocorrencias
    })
    .then(function() {
        console.log('Document successfully written!');
    })
    .catch(function(error) {
        console.error('Error writing document: ', error);
    });
    // this.animaisRef.add(animal);
  }

  updateAnimal(animal: Animais): Promise<void> {
    return this.animaisRef.doc<Animais>(animal.IdChip)
    .update(animal);
  }

  deleteAnimal(animal: Animais): Promise<void> {
    return this.animaisRef.doc<Animais>(animal.IdChip)
    .delete();
  }

  get(IdChip: string): Observable<Animais> {
    let a = this.animaisRef.doc<Animais>(IdChip).valueChanges();
    return a[0];
  }

  getAnimal(chipAnimal: string): Observable<Animais> {
    let a = this.db.collection<Animais>('animais', ref => ref.where('IdChip', '==', chipAnimal) && ref.limit(1)).valueChanges();
    return a[0];
  }
}

