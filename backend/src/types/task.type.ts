export interface ITask {
  id?: number;
  titulo: string;
  descricao?: string;
  status_id?: number;
  data_vencimento?: Date | string;
  usuario_id: number;
  created_at?: Date;
  updated_at?: Date;
}