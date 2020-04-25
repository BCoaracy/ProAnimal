import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { iAgenda } from '../models/agenda.model';
import { ServiceFireBase } from '../core/iservicefirebase.service';

@Injectable({ providedIn: 'root' })

export class AgendamentoService extends ServiceFireBase<iAgenda>{

  constructor(firestore: AngularFirestore) {
    super(iAgenda, firestore, 'agendamentos');
  }

  add(a: iAgenda) {
    a.Id = this.firestore.createId();
    return this.firestore.doc(a.Id).set(a);
  }

  getAgendamentosData(Data: string) {
    return this.firestore.collection<iAgenda>('agendamentos', ref =>
      ref.where('DataAgendada', '==', Data)
    ).valueChanges()
  }

}
