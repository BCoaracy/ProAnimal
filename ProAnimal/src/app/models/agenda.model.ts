import { Model } from '../core/model';
export class iAgenda extends Model {
  Id: string;
  AnimalChip: string;
  DataAgendada: string;
  HoraAgendada: string;
  DataAgendamento: string;
  ProcedimentoRealizado: Boolean;
  Bloquear: Boolean;
  TecnicoResponsavel: string;
}
