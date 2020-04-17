import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { iVacinas } from '../models/vacinas.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacinasService {

  private vacinasCollection: AngularFirestoreCollection<iVacinas>
    = this.afs.collection('vacinas');

  constructor(private afs: AngularFirestore) { }

  getVacinas(): Observable<iVacinas[]> {
    console.log('get Vacinas vacinaService')
    return this.vacinasCollection.valueChanges();
  }

  addVacinas(v: iVacinas) {
    
    v.Id = this.afs.createId();
    return this.vacinasCollection.doc(v.Id).set(v);
    // return this.vacinasCollection.add(v);
  }

  updateVacina(v: iVacinas){
    return this.vacinasCollection.doc(v.Id).set(v);
  }

  deleteVacina(v: iVacinas){
    return this.vacinasCollection.doc(v.Id).delete();
  }

  searchByName(nome:string): Observable<iVacinas[]>{
    return this.afs.collection<iVacinas>('vacinas', 
      ref => ref.orderBy('Nome').startAt(nome).endAt(nome+"\uf8ff"))
      .valueChanges();
  }


}
