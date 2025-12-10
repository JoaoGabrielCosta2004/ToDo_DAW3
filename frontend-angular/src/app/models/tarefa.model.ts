export interface Tarefa {
  id: number;
  lookupId: string;
  descricao: string;
  feito: boolean;
}

export interface TarefaRequest {
  descricao: string;
}
