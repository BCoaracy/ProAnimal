import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { iTutores } from '../models/tutores.model';
import { iEndereco } from '../models/endereco.model';
import { iVeterinario } from '../models/veterinario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private tutoresCollection: AngularFirestoreCollection<iTutores>
    = this.afs.collection('tutores');

  private enderecosCollection: AngularFirestoreCollection<iEndereco>
    = this.afs.collection('enderecos');

  private veterinariosCollection: AngularFirestoreCollection<iVeterinario>
    = this.afs.collection('veterinarios');

  constructor(private afs: AngularFirestore) { }

  //#region Tutores ----------------------------------------------------------
  addTutor(t: iTutores) {
    t.Id = this.afs.createId();
    return this.tutoresCollection.doc(t.Id).set(t);
  }

  update(t: iTutores) {
    return this.tutoresCollection.doc(t.Id).set(t);
  }

  public searchTutorByCpf(cpf: string): Observable<iTutores[]> {
    return this.afs.collection<iTutores>('tutores',
      ref => ref.orderBy('Cpf').startAt(cpf).endAt(cpf + '\uf8ff'))
      .valueChanges();
  }
  //#endregion

  //#region Endereço -----------------------------------------------------------
  addEndereco(t: iEndereco) {
    t.Id = this.afs.createId();
    return this.enderecosCollection.doc(t.cpf).set(t);
  }

  updateEndereco(t: iEndereco) {
    return this.enderecosCollection.doc(t.cpf).set(t);
  }

  getEndereco(cpf: string): Observable<iEndereco[]> {
    return this.afs.collection<iEndereco>('enderecos',
      ref => ref.where('cpf', '==', cpf))
      .valueChanges();
  }
  //#endregion
  //#region Veterinarios --------------------------------------------------------
  addVeterinario(v: iVeterinario) {
    v.Id = this.afs.createId();
    return this.veterinariosCollection.doc(v.Id).set(v);
  }

  updateVeterinario(v: iVeterinario) {
    return this.veterinariosCollection.doc(v.Id).set(v);
  }

  SearchByNome(Nome: string): Observable<iVeterinario[]> {
    return this.afs.collection<iVeterinario>('veterinarios',
      ref => ref.orderBy('Nome').startAt(Nome).endAt(Nome + '\uf8ff'))
      .valueChanges();
  }
  searchVetByCpf(cpf: string): Observable<iVeterinario[]> {
    return this.afs.collection<iVeterinario>('veterinarios',
      ref => ref.orderBy('Cpf').startAt(cpf).endAt(cpf + '\uf8ff'))
      .valueChanges();
  }


  //#endregion
}
