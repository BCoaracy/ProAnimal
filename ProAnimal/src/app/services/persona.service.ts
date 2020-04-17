import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { iTutores } from '../models/tutores.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private tutoresCollection: AngularFirestoreCollection<iTutores>
    = this.afs.collection('tutores');

  constructor(private afs: AngularFirestore) { }

  addTutor(t: iTutores) {
    return this.tutoresCollection.add(t);
  }

  // searchTutorByCpf(cpf: string): Observable<iTutores> {
  //   this.tutoresCollection
  // }

}
