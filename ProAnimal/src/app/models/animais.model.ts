import { Model } from '../core/model';
import { iHistorico } from './historico.model';

export class iAnimais extends Model {
  IdChip: string;
  Tutor: string;
  DataNasc: Date;
  Especie: string;
  Nome: string;
  Observacoes: string;
  Raca: string;
  Tamanho: string;
  Ocorrencias: iHistorico[];
}
