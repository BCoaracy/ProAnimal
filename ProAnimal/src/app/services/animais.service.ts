import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { iAnimais } from '../models/animais.model';
import { PersonaService } from '../services/persona.service';


@Injectable({
  providedIn: 'root'
})

export class AnimaisService {

  private pService: PersonaService;

  private animaisCollection: AngularFirestoreCollection<iAnimais>
    = this.afs.collection('animais')

  constructor(private afs: AngularFirestore) { }

  getAnimal(idchip: string) {
    return this.afs.collection<iAnimais>('animais', ref =>
      ref.where('IdChip', '==', idchip)
    ).valueChanges()
  }

  searchByCpf(cpf: string) {
    return this.pService.searchTutorByCpf(cpf);
  }

  createAnimal(a: iAnimais) {
    //return this.animaisCollection.add(a);
    return this.animaisCollection.doc(a.IdChip).set(a);
  }

  updateAnimal(a: iAnimais) {
    return this.animaisCollection.doc(a.IdChip).set(a);
  }

  // deleteAnimal(a: iAnimais) {
  //   return this.animCollection.doc(a.IdChip)
  //     .delete();
  // }




}

