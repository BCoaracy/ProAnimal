import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Animais } from '../animais/animais';
import { Observable } from 'rxjs';

@Injectable()

export class AnimaisService {

  private dbPath = '/animais';

  animaisRef: AngularFirestoreCollection<Animais> ;

  constructor(private db: AngularFirestore) {
    this.animaisRef = db.collection(this.dbPath);
  }

  createAnimal(a: Animais): Promise<void> {
    const Id_chip = this.db.createId();
    return this.animaisRef.doc<Animais>(Id_chip)
    .set({IdChip: Id_chip,
          Tutor: a.Tutor,
          DataNasc: a.DataNasc,
          Especie: a.Especie,
          Nome: a.Nome,
          Observacoes: a.Observacoes,
          Raca: a.Raca,
          Tamanho: a.Tamanho
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
    return this.animaisRef.doc<Animais>(IdChip).valueChanges();
  }

  getAnimal(chipAnimal: number) {
    return this.db.collection<Animais>('animais', ref => ref.where('Id_chip', '==', chipAnimal) && ref.limit(1)).valueChanges();
  }
}
